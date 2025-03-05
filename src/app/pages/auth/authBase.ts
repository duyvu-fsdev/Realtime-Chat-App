import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { AuthService } from "src/app/services/auth.service";
import { EventTrackingService } from "src/app/services/event-tracking.service";
import { LoadingService } from "src/app/services/loading.service";
import { NotificationService } from "src/app/services/notification.service";
import { StorageService } from "src/app/services/storage.service";

@Component({
  template: "",
})
export abstract class AuthBasePage implements OnInit {
  authStateSubscription!: Subscription;
  language: string = "vi-VN";
  //pageDetail
  form!: FormGroup;
  submitType!: "login" | "register" | "forgotPassword" | "resetPassword" | "verify";
  returnUrl!: string;

  constructor(
    protected formBuilder: FormBuilder,
    protected toastController: ToastController,
    protected route: ActivatedRoute,
    protected navCtrl: NavController,
    protected translate: TranslateService,
    protected loading: LoadingService,
    protected auth: AuthService,
    protected notification: NotificationService,
    protected account: AccountService,
    protected storage: StorageService,
    protected eventTracking: EventTrackingService
  ) {
    this.eventTracking.getEvents().subscribe((data: { Code: string; Value?: any }) => {
      switch (data.Code) {
        case "app:loadedLocalData":
          this.preLoadData();
          break;
        default:
          break;
      }
    });
  }
  preLoadData() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/conversations";
    if (this.account.user && this.account.user.id) this.navCtrl.navigateRoot(this.returnUrl);
  }

  ngOnInit() {
    this.preLoadData();
    this.initPageDetail();
  }

  abstract initPageDetail(): void;

  checkPasswordsMatch() {
    const passwordControl = this.form.get("password");
    const confirmPasswordControl = this.form.get("confirmPassword");
    const passwordErrors = passwordControl?.errors || {};
    const confirmPasswordErrors = confirmPasswordControl?.errors || {};
    if (
      passwordControl?.value &&
      confirmPasswordControl?.value &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      // passwordErrors['passwordMismatch'] = true;
      confirmPasswordErrors["passwordMismatch"] = true;
    } else {
      // delete passwordErrors['passwordMismatch'];
      delete confirmPasswordErrors["passwordMismatch"];
    }
    passwordControl?.setErrors(Object.keys(passwordErrors).length ? passwordErrors : null);
    confirmPasswordControl?.setErrors(Object.keys(confirmPasswordErrors).length ? confirmPasswordErrors : null);
  }

  isError(field: string, error: string): boolean {
    return this.form.get(field)?.touched && this.form.get(field)?.errors?.[error];
  }

  async submit() {
    try {
      console.log(this.form.value);
      const result = await this.loading.showLoadingWithPromise(
        this.auth.authenticate(this.submitType, this.form.value),
        { key: "Please wait for a few moments" }
      );

      if (this.submitType === "register") this.onRegisterSuccess({ result, credentials: this.form.value });
      else {
        console.log({ result });
        this.onSuccess(result);
      }
    } catch (error) {
      this.onError(error);
    }
  }

  async onRegisterSuccess(result: any) {
    this.submitType = "login";
    if (result.credentials && result.credentials.email && result.credentials.password)
      this.form = this.formBuilder.group({
        email: [result.credentials.email],
        password: [result.credentials.password],
      });

    await this.submit();
    await this.notification.showToast("Đã đăng ký thành công. Tự động đăng nhập", "success");
  }

  abstract onSuccess(result: any): void;
  abstract onError(error: any): void;
  goToPage(page: string) {
    this.navCtrl.navigateForward(page);
  }

  ionViewWillEnter() {
    // console.log("ionViewWillEnter");
  }

  ionViewWillLeave() {
    // console.log("ionViewWillLeave");
  }

  changeLang(lang: string) {
    this.language = lang;
    this.translate.use(lang);
  }
}
