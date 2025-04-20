import { Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { ComponentsModuleShare } from "src/app/share";
import { AuthBasePage } from "../authBase";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss", "../auth.page.scss"],
  imports: [ComponentsModuleShare],
})
export class LoginPage extends AuthBasePage {
  initPageDetail() {
    this.form = this.formBuilder.group({
      email: ["victor@example.com", [Validators.required, Validators.email]],
      password: ["001101", [Validators.required]],
    });
    this.submitType = "login";
  }
  async onSuccess(result: any) {
    const { accessToken, refreshToken } = result;
    await Promise.all([this.auth.setAccessToken(accessToken), this.auth.setRefreshToken(refreshToken)]);
    await this.account.loadSavedData(true);
  }

  onError(error: any): void {
    console.log(error);
  }

  ngOnDestroy(): void {}
}
