import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { AuthBasePage } from "../authBase";
import { ComponentsModuleShare } from "src/app/share";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss", "../auth.page.scss"],
  imports: [ComponentsModuleShare],
})
export class RegisterPage extends AuthBasePage {
  isReqRegister = false;
  email = "";
  error!: string;

  override onSuccess(result: any): void {
    if (this.submitType === "verify") {
      this.isReqRegister = true;
      this.initPageDetail();
    }
  }
  override onError(error: any): void {
    this.error = error.error.message;
    console.log({ error: this.error });
  }

  initPageDetail(): void {
    this.form = this.isReqRegister
      ? this.formBuilder.group({
          firstName: ["", [Validators.required, Validators.maxLength(15)]],
          lastName: ["", [Validators.required, Validators.maxLength(15)]],
          displayName: ["", [Validators.required]],
          email: [this.email, [Validators.required, Validators.email]],
          gender: ["", [Validators.required]],
          password: ["", [Validators.required, Validators.minLength(6)]],
          confirmPassword: ["", [Validators.required]],
          otp: [, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
        })
      : this.formBuilder.group({
          email: ["", [Validators.required, Validators.email]],
        });

    this.form.get("password")?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
    this.form.get("confirmPassword")?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
    this.submitType = this.isReqRegister ? "register" : "verify";
  }
  s() {
    this.email = this.form.get("email")?.value;
    console.log(this.email);
  }
  getAnotherOtp() {
    this.submitType = "verify";
    this.submit();
  }

  setDisplayName() {
    this.form.patchValue({ displayName: this.form.value.firstName + " " + this.form.value.lastName });
    console.log(this.form.value.displayName);
  }

  ngOnDestroy(): void {}
}
