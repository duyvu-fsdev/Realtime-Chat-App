import { Injectable } from "@angular/core";
import { AlertController, AlertOptions, ToastController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom } from "rxjs";
import { LanguageService } from "./language.service";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  lastMessage: string = "";
  private toastEl!: HTMLIonToastElement | null;
  private alertEl!: HTMLIonAlertElement | null;

  constructor(
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  async showToast(
    resource: { message: string; value?: string } | string,
    color?:
      | "primary"
      | "secondary"
      | "tertiary"
      | "success"
      | "warning"
      | "danger"
      | "light"
      | "medium"
      | "dark"
  ) {
    if (this.toastEl) {
      await this.toastEl.dismiss();
      this.toastEl = null;
    }
    try {
      const translatedValue =
        typeof resource === "string"
          ? await this.languageService.translateResource({ key: resource })
          : resource.value
          ? await this.languageService.translateResource({
              key: resource.message,
              interpolateParams: { value: resource.value },
            })
          : await this.languageService.translateResource({
              key: resource.message,
            });

      if (typeof resource !== "string") {
        const translatedValue2 = lastValueFrom(
          this.translate.get(resource.message, { value: resource.value })
        );
        const translatedValue3 = this.translate.instant(resource.message, {
          value: resource.value,
        });
        console.log(translatedValue2, translatedValue3);
      }

      this.toastEl = await this.toastController.create({
        message: translatedValue,
        color: color,
        duration: 3000,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);

      this.toastEl = await this.toastController.create({
        message: "An error occurred while show toast.",
        color: "danger",
        duration: 3000,
        position: "bottom",
      });
      throw error;
    } finally {
      if (this.toastEl) await this.toastEl.present();
    }
  }

  async showPrompt(
    message: string,
    header: string = "",
    subHeader: string = "",
    okText: string = "Ok",
    cancelText: string = "Cancel",
    inputs?: any[]
  ) {
    if (this.alertEl) {
      await this.alertEl.dismiss();
      this.alertEl = null;
    }
    try {
      const messageTranslated = await this.languageService.translateResource({
        key: message,
      });
      const subHeaderTranslated = await this.languageService.translateResource({
        key: subHeader,
      });
      const headerTranslated = await this.languageService.translateResource({
        key: header,
      });
      const okTextTranslated = await this.languageService.translateResource({
        key: okText,
      });
      const cancelTextTranslated = await this.languageService.translateResource(
        { key: cancelText }
      );

      const option: AlertOptions = {
        header: headerTranslated,
        subHeader: subHeaderTranslated,
        message: messageTranslated,
        buttons: [
          {
            text: cancelTextTranslated,
            role: "cancel",
            handler: () => {
              return false;
            },
          },
          {
            text: okTextTranslated,
            cssClass: "danger-btn",
            role: "confirm",
            handler: (alertData: any) => {
              return alertData;
            },
          },
        ],
        inputs,
      };

      this.alertEl = await this.alertCtrl.create(option);
      await this.alertEl.present();
    } catch (error) {
      console.log(error);
      this.showToast("An error occurred while show Prompt.", "danger");
      throw error;
    }
  }
}
