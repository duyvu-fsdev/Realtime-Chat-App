import { Component } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ActionSheetButton } from "@ionic/angular";

import { AccountService } from "./services/account.service";
import { EventTrackingService } from "./services/event-tracking.service";
import { LanguageService } from "./services/language.service";
import { LoadingService } from "./services/loading.service";
import { NotificationService } from "./services/notification.service";
import { ComponentsModuleShare } from "./share";
import { TmpService } from "./services/tmp.service";

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
    private tmp: TmpService
  ) {
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
    this.conversations = this.tmp.listConversation.map((conversation) => {
      if (conversation.isGroup) {
        return conversation;
      } else {
        console.log(this.account.userTest?.id);

        const memberId = this.tmp.litsConversationMember
          .filter((member) => member.conversationId === conversation.id && member.userId !== this.account.userTest?.id)
          .map((member) => member.userId)[0];
        console.log(memberId);

        const member = this.tmp.listUser.find((user) => user.id === memberId);
        console.log(member);

        return {
          ...conversation,
          name: member ? member.name : conversation.name,
        };
      }
    });
  }

  async init() {
    await this.language.getLang();
    await this.loading.showLoading({ key: "Initializing data..." });
    await this.account.loadSavedData();
    await this.loading.hideLoading();
    console.log(this.account.user);

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
}
