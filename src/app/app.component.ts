import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ActionSheetButton } from "@ionic/angular";
import { addIcons } from "ionicons";
import {
  arrowBackOutline,
  arrowDownOutline,
  arrowForwardOutline,
  arrowRedoSharp,
  caretBack,
  chatbubbleEllipses,
  chatbubblesSharp,
  chevronBackOutline,
  chevronDownOutline,
  chevronUpOutline,
  close,
  createOutline,
  documentAttachOutline,
  documentOutline,
  ellipsisHorizontalOutline,
  ellipsisVertical,
  imageOutline,
  linkOutline,
  peopleSharp,
  personAdd,
  sendSharp,
  transgender,
  videocamOutline,
} from "ionicons/icons";
import { AccountService } from "./services/account.service";
import { DeviceInfoService } from "./services/device-info.service";
import { EventTrackingService } from "./services/event-tracking.service";
import { LanguageService } from "./services/language.service";
import { LoadingService } from "./services/loading.service";
import { NotificationService } from "./services/notification.service";
import { WebsocketService } from "./services/websocket.service";
import { ComponentsModuleShare } from "./share";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  imports: [RouterLink, RouterLinkActive, ComponentsModuleShare],
})
export class AppComponent {
  isLoggedIn: boolean = false;
  isLoaded: boolean = false;
  currentLang!: string;

  conversations: any[] = [];
  public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

  constructor(
    private eventTracking: EventTrackingService,
    private language: LanguageService,
    private loading: LoadingService,
    public account: AccountService,
    private router: Router,
    private notification: NotificationService,
    private websocket: WebsocketService,
    public deviceInfo: DeviceInfoService
  ) {
    addIcons({
      caretBack,
      peopleSharp,
      chevronBackOutline,
      chatbubblesSharp,
      linkOutline,
      arrowBackOutline,
      ellipsisHorizontalOutline,
      chatbubbleEllipses,
      personAdd,
      ellipsisVertical,
      transgender,
      sendSharp,
      createOutline,
      close,
      arrowForwardOutline,
      chevronUpOutline,
      chevronDownOutline,
      arrowRedoSharp,
      arrowDownOutline,
      documentAttachOutline,
      documentOutline,
      imageOutline,
      videocamOutline,
    });
    this.eventTracking.getEvents().subscribe((data: { Code: string; Value?: any }) => {
      switch (data.Code) {
        case "app:changeLanguage":
          this.currentLang = data.Value;
          this.setActionSheetButtons();
          break;
        case "app:logout":
          this.router.navigate(["/auth"]);
          this.notification.showToast("You have log out of the system", "danger");
          break;
        default:
          break;
      }
    });
    this.init();
  }

  async init() {
    await this.language.getLang();
    await this.loading.showLoading({ key: "Initializing data..." });
    await this.account.loadSavedData();
    await this.loading.hideLoading();
    if (this.account.currentUser?.id) this.websocket.connect();

    this.isLoaded = true;
  }

  // language
  actionSheetButtons!: ActionSheetButton[];

  setActionSheetButtons() {
    this.actionSheetButtons = [
      {
        text: this.currentLang == "vi-VN" ? "Tiếng Việt (đang sử dụng)" : "Tiếng Việt",
        icon: "assets/icon/vn.svg",
        data: "vi-VN",
        role: "selected",
        disabled: this.currentLang == "vi-VN",
      },
      {
        text: this.currentLang == "en-US" ? "English (in use)" : "English",
        icon: "assets/icon/us.svg",
        data: "en-US",
        role: "selected",
        disabled: this.currentLang == "en-US",
      },
    ];
  }

  async changeLanguage(detail: any) {
    const { data, role } = detail;
    if (role === "selected" && this.currentLang !== data) {
      await this.loading.showLoading({ key: "" });
      await this.language.setLang(data);
      this.eventTracking.publishEvent({ Code: "app:changeLanguage", Value: data || "en-US" });
      await this.loading.hideLoading();
    }
  }

  async logout() {
    this.account.userLogout();
  }
  ngOnDestroy() {
    this.websocket.disconnect();
  }

  ngAfterContentChecked() {
    const element = document.querySelector("#main-content");
    if (element) element.removeAttribute("aria-hidden");
  }
}
