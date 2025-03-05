import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Observable } from "rxjs";
import { LanguageService } from "./language.service";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loadingEl!: HTMLIonLoadingElement | null;

  constructor(
    private loadingController: LoadingController,
    private languageService: LanguageService
  ) {}

  async showLoading(resource?: {
    key: string;
    interpolateParams?: { [key: string]: string };
  }) {
    if (this.loadingEl) {
      await this.loadingEl.dismiss();
      this.loadingEl = null;
    }
    try {
      if (!resource) resource = { key: "Processing..." };
      const message = !!resource.key
        ? await this.languageService.translateResource(resource)
        : "";
      this.loadingEl = await this.loadingController.create({
        message,
        spinner: "crescent",
        duration: 0,
        backdropDismiss: false,
        cssClass:
          message === "" ? "custom-loading none-content" : "custom-loading",
      });
    } catch (error) {
      console.error("Error showing loading:", error);
      this.loadingEl = await this.loadingController.create({
        message: "An error occurred while loading.",
        spinner: "crescent",
        duration: 2000,
        backdropDismiss: true,
        cssClass: "custom-loading",
      });
    } finally {
      if (this.loadingEl) await this.loadingEl.present();
    }
  }

  async showLoadingWithPromise(
    promiseFunc: Promise<any> | Observable<any>,
    resource?: { key: string; interpolateParams?: { [key: string]: string } }
  ) {
    try {
      if (!resource) await this.showLoading();
      await this.showLoading(resource);
      return await promiseFunc;
    } catch (error) {
      throw error;
    } finally {
      await this.hideLoading();
    }
  }

  async hideLoading() {
    if (this.loadingEl) {
      await this.loadingEl.dismiss();
      this.loadingEl = null;
    }
  }
}
