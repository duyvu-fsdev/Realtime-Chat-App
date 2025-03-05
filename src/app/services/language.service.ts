import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { lastValueFrom, Subject } from "rxjs";
import { StorageService } from "./storage.service";
import { EventTrackingService } from "./event-tracking.service";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  languageTracking = new Subject<any>();

  language!: string;
  constructor(
    private storageService: StorageService,
    private translate: TranslateService,
    private eventTrackingService: EventTrackingService
  ) {}

  async setLang(lang?: string) {
    if (!lang) lang = "en-US";
    await this.storageService.setStorage("lang", lang);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    this.language = lang;
    this.languageTracking.next(this.language);
    this.eventTrackingService.publishEvent({
      Code: "app:changeLanguage",
      Value: lang,
    });
  }

  async getLang(): Promise<string> {
    try {
      const lang = await this.storageService.getStorage("lang");
      await this.setLang(lang);
      return lang;
    } catch (error) {
      await this.setLang("en-US");
      return "en-US";
    }
  }

  async translateResource(resource: {
    key: string;
    interpolateParams?: { [key: string]: string };
  }): Promise<string> {
    const { key, interpolateParams } = resource;
    return new Promise((resolve, reject) => {
      this.translate.get(key, interpolateParams).subscribe({
        next: (translatedValue: string) => resolve(translatedValue),
        error: (error) => reject(error),
      });
    });
  }

  // async translateResource(resource: { key: string; interpolateParams?: { [key: string]: string } }): Promise<string> {
  //   const { key, interpolateParams } = resource;
  //   console.log(resource);

  //   return lastValueFrom(this.translate.get(key, interpolateParams));
  // }
}
