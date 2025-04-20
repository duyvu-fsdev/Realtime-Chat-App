import { Component } from "@angular/core";
import { ComponentsModuleShare } from "src/app/share";
import { ConversationBasePage } from "../conversationBase";

@Component({
  selector: "app-conversation",
  templateUrl: "./conversation-detail.page.html",
  styleUrls: ["./conversation-detail.page.scss", "../tmp.scss", "../tmp2.scss", "../conversationBase.scss"],
  imports: [ComponentsModuleShare],
})
export class ConversationDetailPage extends ConversationBasePage {
  async initPage() {
    const conversationId = this.route.snapshot.paramMap.get("id");
    if (conversationId) {
      await this.getConversationById(conversationId);
      this.conversationId = conversationId;
      this.isLoaded = true;
      this.initialLoadDone = true;
    } else {
      this.isLoaded = true;
      this.navCtrl.navigateRoot(`/conversations`);
    }
    this.listenForNewMessages();
  }

  showInfo = false;

  toggleShowInfo() {
    this.showInfo = !this.showInfo;
  }

  closeSidebar() {
    this.showInfo = false;
  }

  ex: string = "";

  toggleEx(ex: string) {
    if (this.ex === ex) this.ex = "";
    else this.ex = ex;
  }

  ionViewDidEnter() {
    // this.textareaFocus();
  }
}
