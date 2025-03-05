import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { NotificationService } from "../services/notification.service";
import { AccountService } from "../services/account.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private notification: NotificationService, private account: AccountService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      if (!this.account.isloaded) {
        console.log("AuthGuard", this.account.isloaded);
        await this.account.loadSavedData();
        return await this.checkFormPermission(next, state);
      } else return await this.checkFormPermission(next, state);
    } catch (err) {
      console.error("AuthGuard error:", err);
      // this.account.commonService.checkError(err);
      return false;
    }
  }

  async checkFormPermission(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = this.account.user;
    if (!user || !user.id) {
      this.notification.showToast("You are not authorized to access here, please log in.", "warning");
      await this.router.navigate(["/"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    if (state.url.includes("/dashboard")) {
      const isAuthorized = user.role === "manager" || user.role === "admin";
      if (!isAuthorized) {
        this.notification.showToast(
          "You are not authorized to access here, please contact Admin to get authorization.",
          "warning"
        );
      }
      return isAuthorized;
    }
    return true;
  }
}
