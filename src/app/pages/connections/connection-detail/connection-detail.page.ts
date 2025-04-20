import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { ConnectionService } from "src/app/services/connection.service";
import { ConversationService } from "src/app/services/conversation.service";
import { ComponentsModuleShare } from "src/app/share";
import { NavController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-connection-detail",
  templateUrl: "./connection-detail.page.html",
  styleUrls: ["./connection-detail.page.scss"],
  standalone: true,
  imports: [ComponentsModuleShare],
})
export class ConnectionDetailPage implements OnInit {
  user: any;
  constructor(
    private route: ActivatedRoute,
    public account: AccountService,
    private connection: ConnectionService,
    private conversation: ConversationService,
    protected navCtrl: NavController
  ) {}

  async ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("id");
    if (userId) {
      this.user = await this.connection.getConnectionById(userId);
    }
  }

  addFriend(id: number) {
    console.log(id);
  }

  async sendMessage() {
    const userIds = [this.user.id, this.account.currentUser.id];
    const conversation: any = await this.conversation.getConversationByMembers(userIds);
    console.log(conversation);

    if (conversation) {
      this.navCtrl.navigateRoot(`/conversations/${conversation.id}`);
      return;
    }
    this.navCtrl.navigateRoot(`/conversations/new?receiverId=${this.user.id}`);
  }

  viewMore() {}
}
