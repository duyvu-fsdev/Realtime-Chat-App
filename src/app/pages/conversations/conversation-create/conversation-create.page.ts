import { Component, ViewChild } from "@angular/core";
import { IonSearchbar } from "@ionic/angular";
import { ComponentsModuleShare } from "src/app/share";
import { ConversationBasePage } from "../conversationBase";

@Component({
  selector: "app-conversation-create",
  templateUrl: "./conversation-create.page.html",
  styleUrls: ["./conversation-create.page.scss", "../conversations.page.scss"],
  imports: [ComponentsModuleShare],
})
export class ConversationCreatePage extends ConversationBasePage {
  filteredUser: Array<any> = [];
  searchTerm: string = "";
  friends: Array<any> = [];

  initPage(): void {
    this.sortFriendsByOnlineStatus();
    this.filteredUser = this.friends;
    this.pagetitle = "New conversation";
  }

  sortFriendsByOnlineStatus() {
    this.friends.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
    });
  }

  async filterFriends() {
    if (this.searchTerm.trim()) {
      const allUsers = (await this.connection.getConnectionByEmailOrName(this.searchTerm)) as any[];
      this.filteredUser = allUsers.filter(
        (user) => user.id !== this.account.currentUser.id && !this.members.some((member) => member.id === user.id)
      );
    } else {
      this.filteredUser = [];
    }
  }

  async addMember(member: any) {
    this.members.push(member);
    this.searchTerm = "";
    this.filteredUser = [];
    await this.getConversation();
    this.searchFocus();
  }

  async removeMember(id: any) {
    const index = this.members.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.members.splice(index, 1);
      await this.getConversation();
    }
  }

  async getConversation() {
    this.setOtherMembers();
    await this.getConversationByMembers();
  }

  ionViewDidEnter() {
    this.searchFocus();
  }
}
