import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { AuthBasePage } from "../authBase";
import { ComponentsModuleShare } from "src/app/share";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss", "../auth.page.scss"],
  imports: [ComponentsModuleShare],
})
export class ForgotPasswordPage extends AuthBasePage {
  isRequestSent: boolean = false;
  initPageDetail() {
    this.form = this.formBuilder.group({
      email: [
        "duyvu.fullstackdev@gmail.com",
        [Validators.required, Validators.email],
      ],
    });
    this.submitType = "forgotPassword";
  }
  override onSuccess(result: any): void {
    this.isRequestSent = true;
  }
  override onError(error: any): void {
    console.log(error);
  }
  ionViewDidLeave(): void {
    this.isRequestSent = false;
  }
  ngOnDestroy(): void {}
}
