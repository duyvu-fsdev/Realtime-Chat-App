import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DeviceInfoService {
  constructor(private platform: Platform) {}

  getDeviceType(): string {
    if (this.platform.is("mobile")) return "mobile";
    if (this.platform.is("tablet")) return "tablet";
    return "desktop";
  }

  getOS(): string {
    if (this.platform.is("ios")) return "iOS";
    if (this.platform.is("android")) return "Android";
    return "Unknown OS";
  }

  isMobile(): boolean {
    return this.platform.is("mobile");
  }

  isTablet(): boolean {
    return this.platform.is("tablet");
  }

  isDesktop(): boolean {
    return !this.isMobile() && !this.isTablet();
  }
}
