import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { TmpService } from "src/app/services/tmp.service";
import { ComponentsModuleShare } from "src/app/share";

@Component({
  selector: "app-conversation",
  templateUrl: "./conversation-detail.page.html",
  styleUrls: ["./conversation-detail.page.scss"],
  imports: [ComponentsModuleShare],
})
export class ConversationPage implements OnInit {
  conversation: any;
  messages: any[] = [];
  newMessage: string = "";
  constructor(private route: ActivatedRoute, private tmp: TmpService, public account: AccountService) {}
  ngOnInit() {
    const conversationId = this.route.snapshot.paramMap.get("id");
    if (conversationId) {
      const conversationIdNumber = Number(conversationId);
      const c = this.tmp.getConversation(conversationIdNumber);
      if (!c?.isGroup) {
        const memberId = this.tmp.litsConversationMember
          .filter((member) => member.conversationId === c?.id && member.userId !== this.account.userTest?.id)
          .map((member) => member.userId)[0];

        const member = this.tmp.listUser.find((user) => user.id === memberId);
        this.conversation = { ...c, name: member ? member.name : c?.name };
      } else {
        this.conversation = c;
      }
      this.messages = this.tmp.getMessagesByConversationId(conversationIdNumber);
    }
    console.log(this.conversation);
  }
  sendMessage() {
    console.log(this.newMessage);
  }

  a = {
    id: 1,
    conversationId: 1,
    senderId: 1,
    messageType: "text",
    content: "Hello",
    readBy: [1, 2],
  };
}
