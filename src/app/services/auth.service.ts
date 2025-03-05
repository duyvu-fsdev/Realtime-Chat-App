import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { StorageService } from "./storage.service";
import { EventTrackingService } from "./event-tracking.service";

type AuthActionType =
  | "login"
  | "register"
  | "getProfile"
  | "refreshToken"
  | "resetPassword"
  | "logout"
  | "forgotPassword"
  | "verify";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  API_SERVER = "http://192.168.1.250:8080/api";

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private eventTrackingService: EventTrackingService
  ) {}

  async getAccessToken(): Promise<{
    token: string | null;
    expiresOn: string | null;
  } | null> {
    try {
      const userToken = await this.storage.getStorage("userToken");
      const isTokenValid = userToken.token && userToken.expiresOn && Date.now() < parseInt(userToken.expiresOn);
      return isTokenValid ? userToken : null;
    } catch (error) {
      console.error("Lỗi khi lấy access token:", error);
      return null;
    }
  }

  async getRefreshToken() {
    try {
      return await this.storage.getSecureStorage("refreshToken");
    } catch (error) {
      console.error("Lỗi khi lấy refresh Token:", error);
      return null;
    }
  }

  async setAccessToken(accessToken: { token: string; expiresOn: number } | null) {
    await this.storage.setStorage("userToken", accessToken);
  }
  async setRefreshToken(refreshToken: string | null) {
    await this.storage.setSecureStorage("refreshToken", refreshToken);
  }

  async authenticate(actionType: AuthActionType, credentials: any) {
    switch (actionType) {
      case "login":
        return await firstValueFrom(this.http.post(`${this.API_SERVER}/login`, credentials));
      case "verify":
        return await firstValueFrom(this.http.post(`${this.API_SERVER}/get-reg-otp`, credentials));
      case "register":
        return await firstValueFrom(this.http.post(`${this.API_SERVER}/register`, credentials));
      case "getProfile":
        return await firstValueFrom(this.http.get(`${this.API_SERVER}/profile`));
      case "refreshToken":
        return await firstValueFrom(this.http.get(`${this.API_SERVER}/refresh-token`));
      case "resetPassword":
        return firstValueFrom(this.http.post(`${this.API_SERVER}/reset-password`, credentials));
      case "logout":
        return firstValueFrom(this.http.get(`${this.API_SERVER}/logout`));
      case "forgotPassword":
        return firstValueFrom(this.http.post(`${this.API_SERVER}/forgot-password`, credentials));
      default:
        throw new Error("Unknown action type");
    }
  }

  // async login(credentials: { username: string; password: string }) {
  //   const { username, password } = credentials;
  //   let urlSearchParams = new URLSearchParams();
  //   urlSearchParams.set('grant_type', 'password');
  //   urlSearchParams.set('username', username);
  //   urlSearchParams.set('password', password);
  //   let data = urlSearchParams.toString();

  //   try {
  //     const response = await firstValueFrom(this.commonService.connect('Login', APIList.ACCOUNT.token.url, data));
  //     return response;
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async getProfile() {
    try {
      return await firstValueFrom(this.http.get(`${this.API_SERVER}/profile`));
    } catch (e) {
      throw e;
    }
  }

  async refreshToken() {
    try {
      return await firstValueFrom(this.http.get(`${this.API_SERVER}/refresh-token`));
    } catch (e) {
      throw e;
    }
  }

  async removeToken() {
    await this.storage.clearSecureStorageItem();
  }
}
