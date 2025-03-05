import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { register } from "swiper/element/bundle";
import { AuthBasePage } from "./authBase";
import { ComponentsModuleShare } from "src/app/share";
register();
@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ComponentsModuleShare],
})
export class AuthPage extends AuthBasePage {
  initPageDetail(): void {}
  override onSuccess(result: any): void {}
  override onError(error: any): void {}
}
