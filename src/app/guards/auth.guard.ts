import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { NotificationService } from "../services/notification.service";
import { AccountService } from "../services/account.service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private notification: NotificationService, private account: AccountService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // try {
    if (!this.account.isloaded) await this.account.loadSavedData();
    return await this.checkFormPermission(next, state);
    // } catch (err) {
    //   console.log("AuthGuard error:", err);
    //   return false;
    // }
  }

  async checkFormPermission(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = this.account.currentUser;
    if (!currentUser || !currentUser.id) {
      this.notification.showToast("You are not authorized to access here, please log in.", "warning");
      await this.router.navigate(["/"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    if (state.url.includes("/dashboard")) {
      const isAuthorized = currentUser.role === "manager" || currentUser.role === "admin";
      if (!isAuthorized) {
        this.notification.showToast("You are not authorized to access here, please contact Admin to get authorization.", "warning");
      }
      return isAuthorized;
    }
    return true;
  }
}
