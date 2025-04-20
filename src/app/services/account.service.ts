import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { AuthService } from "./auth.service";
import { EventTrackingService } from "./event-tracking.service";
import { StorageService } from "./storage.service";
import { ErrorHandlingService } from "./errorHandling.service";
import { HttpErrorResponse } from "@angular/common/http";
declare var window: any;

@Injectable({
  providedIn: "root",
})
export class AccountService {
  currentUser: any;
  isloaded = false;
  constructor(
    // public commonService: CommonService,
    public plt: Platform,
    private storage: StorageService,
    private eventTracking: EventTrackingService,
    private auth: AuthService,
    private errorHandling: ErrorHandlingService
  ) {}

  async loadSavedData(forceReload = false) {
    if (this.isloaded && !forceReload) return;
    try {
      await this.getProfile(forceReload);
      this.eventTracking.publishEvent({ Code: "app:loadedLocalData" });
      this.isloaded = true;
    } catch (error) {
      throw error;
    }
  }

  // private async lazyProfileCheck() {
  //   try {
  //     const userName = await this.commonService.connect('GET', 'Account/UserName', null).toPromise();
  //
  //     if (this.currentUser?._id && this.currentUser.email !== userName) {
  //       // this.storageService.setStorage('appVersion', '0.0');
  //       // await this.checkVersion();
  //     } else {
  //       setTimeout(async () => {
  //         try {
  //           const a = await this.getProfile(true);
  //
  //           this.eventTracking.publishEvent({ Code: 'app:loadedLocalData' });
  //         } catch (error) {
  //           console.error('Error during lazy profile check:', error);
  //         }
  //       }, 5000);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching username:', error);
  //     this.commonService.checkError(error);
  //   }
  // }

  // private updateWoopraTracking() {
  //   if (this.envService.currentUser) {
  //     const woopraId = {
  //       id: this.envService.currentUser.Id,
  //       email: this.envService.currentUser.Email,
  //       name: this.envService.currentUser.FullName,
  //       avatar: this.envService.currentUser.Avatar,
  //     };
  //     setTimeout(() => {
  //       const woopraInterval = setInterval(() => {
  //         if (window?.woopra) {
  //           window.woopra.identify(woopraId);
  //           window.woopra.push();
  //           clearInterval(woopraInterval);
  //         }
  //       }, 3000);
  //     }, 2000);
  //   }
  // }

  ////

  // async checkVersion() {
  //   try {
  //     await this.envService?.ready;
  //     const appDomain = await this.storageService.getStorage('appDomain');
  //     const version = await this.storageService.getStorage('appVersion');

  //     if (appDomain && appDomain !== environment.appDomain) {
  //       environment.appDomain = appDomain;
  //     }

  //     if (this.envService.version !== version) {
  //       GlobalData.Token = {
  //         access_token: 'no token',
  //         expires_in: 0,
  //         token_type: '',
  //         refresh_token: 'no token',
  //       };
  //
  //       await this.storageService.clearStorage();
  //       await this.storageService.setStorage('UserToken', GlobalData.Token);
  //       this.envService.currentUser = null;
  //       await this.storageService.setStorage('userProfile', null);
  //       await this.storageService.setStorage('appVersion', this.envService.version);

  //       location.reload();
  //       return null;
  //     } else {
  //       return this.envService.version;
  //     }
  //   } catch (error) {
  //     console.error('Error in checkVersion:', error);
  //     return null;
  //   }
  // }

  //

  // settingList = ['Theme', 'IsCompactMenu', 'IsCacheQuery', 'PinnedForms'];

  // loadUserSettings(settings: any[], profile = this.envService.currentUser) {
  //   let userSetting: any = {};
  //   for (let idx = 0; idx < this.settingList.length; idx++) {
  //     const s = this.settingList[idx];
  //     let setting = settings ? settings.find((d) => d.Code == s) : null;

  //     if (setting && setting.Value) {
  //       try {
  //         setting.Value = JSON.parse(setting.Value);
  //       } catch (error) {}
  //     } else {
  //       setting = {
  //         Id: 0,
  //         Code: s,
  //         Value: null,
  //         IDUser: profile.Id,
  //         Email: profile.Email,
  //       };
  //     }
  //     userSetting[s] = setting;
  //   }
  //   return userSetting;
  // }

  async getProfile(forceReload = false) {
    try {
      if (forceReload) {
        await this.getUserData();
        await this.loadSavedProfile();
      } else {
        await this.loadSavedProfile();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.errorHandling.handleError(error.error?.code);
      }
      // throw error;
    }
  }

  async getUserData() {
    try {
      const data = await this.auth.getProfile();
      await this.setProfile(data);
    } catch (error) {
      throw error;
    }
  }

  async setProfile(profile: any) {
    try {
      return await this.storage.setStorage("userProfile", profile);
    } catch (error) {
      throw error;
    }
  }

  async loadSavedProfile() {
    try {
      const userProfile = await this.storage.getStorage("userProfile");
      if (userProfile && userProfile.id) this.currentUser = userProfile;
      else this.currentUser = null;
      this.eventTracking.publishEvent({ Code: "app:updatedUser" });
    } catch (error) {
      throw error;
    }
  }

  async userLogout() {
    try {
      this.currentUser = null;
      // await this.storage.clearStorage();
      //   await this.storage.setStorage('appVersion', currentVersion);
      await Promise.all([this.auth.setAccessToken(null), this.auth.setRefreshToken(null)]);
      await this.setProfile(null);
      //   await Promise.all([
      //     this.accountService.loadSavedProfile(),
      //     this.storage.setStorage('Username', curentUsername),
      //   ]);
      this.eventTracking.publishEvent({ Code: "app:logout" });
      //   return true;
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      throw error;
    }
  }
}
