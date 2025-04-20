import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountService } from "src/app/services/account.service";
import { ConversationService } from "src/app/services/conversation.service";
import { ComponentsModuleShare } from "src/app/share";

@Component({
  selector: "app-conversation",
  templateUrl: "./conversations.page.html",
  styleUrls: ["./conversations.page.scss"],
  imports: [ComponentsModuleShare],
})
export class ConversationsPage implements OnInit {
  conversationId: string | null = null;
  filteredUser: Array<any> = [];
  searchTerm: string = "";
  friends: Array<any> = [];
  conversations: any[] = [];
  groupConversations: any[] = [];
  privateConversations: any[] = [];
  hasActiveConversation = false;
  isLoaded = false;
  constructor(private route: ActivatedRoute, public account: AccountService, private conversation: ConversationService) {}

  async ngOnInit() {
    const cs: any = await this.conversation.getConversations(this.account.currentUser.id);
    this.conversations = cs;
    this.groupConversations = this.conversations.filter((c) => c.isGroup);
    this.privateConversations = this.conversations.filter((c) => !c.isGroup);
    this.groupConversations.forEach((conversation) => {
      conversation.lastTwoSenders = this.getLastTwoSenders(conversation.messages);
    });
    this.isLoaded = true;
  }

  getLastTwoSenders(messages: any[]): any[] {
    if (!messages?.length) return [];
    // Lọc bỏ tin nhắn của chính mình
    const otherMessages = messages.filter((m) => m.senderId !== this.account.currentUser.id);
    // Lấy 2 người gần nhất gửi tin nhắn
    const uniqueSenders = [...new Map(otherMessages.map((m) => [m.senderId, m.sender])).values()];
    return uniqueSenders.slice(-2); // Chỉ lấy 2 người cuối cùng
  }

  sortFriendsByOnlineStatus() {
    this.friends.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
    });
  }

  startConversation(id: number) {
    console.log(id);
  }
}
