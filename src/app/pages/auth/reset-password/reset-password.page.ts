import { Component, OnInit } from "@angular/core";
import { AuthBasePage } from "../authBase";
import { Validators } from "@angular/forms";
import { ComponentsModuleShare } from "src/app/share";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.page.html",
  styleUrls: ["./reset-password.page.scss", "../auth.page.scss"],
  imports: [ComponentsModuleShare],
})
export class ResetPasswordPage extends AuthBasePage {
  initPageDetail(): void {
    this.form = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
    });

    this.form.get("password")?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
    this.form.get("confirmPassword")?.valueChanges.subscribe(() => {
      this.checkPasswordsMatch();
    });
    this.submitType = "register";
  }
  override onSuccess(result: any): void {}
  override onError(error: any): void {}
  ngOnDestroy(): void {}
}
