import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TmpService } from "src/app/services/tmp.service";
import { ComponentsModuleShare } from "src/app/share";

@Component({
  selector: "app-conversation",
  templateUrl: "./conversation.page.html",
  styleUrls: ["./conversation.page.scss"],
  imports: [ComponentsModuleShare],
})
export class ConversationPage implements OnInit {
  conversationId: string | null = null;
  filteredUser: Array<any> = [];
  searchTerm: string = "";
  friends: Array<any> = [];

  constructor(private route: ActivatedRoute, private tmp: TmpService) {
    this.friends = this.tmp.listFriend;
  }

  ngOnInit() {
    this.conversationId = this.route.snapshot.paramMap.get("id");
    this.sortFriendsByOnlineStatus();
    this.filteredUser = this.friends;
    console.log(this.friends);
  }

  sortFriendsByOnlineStatus() {
    this.friends.sort((a, b) => {
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
    });
  }

  filterFriends() {
    if (this.searchTerm.trim() === "") {
      this.filteredUser = this.friends;
      return;
    }
    const searchTermLower = this.searchTerm.toLowerCase();
    const friendsFiltered = this.friends
      .filter((friend) => friend.name.toLowerCase().includes(searchTermLower) || friend.email.toLowerCase().includes(searchTermLower))
      .map((friend) => ({ ...friend, isFriend: true, isOnline: friend.isOnline || false }));
    const usersFiltered = this.tmp.listUser
      .filter((user) => user.name.toLowerCase().includes(searchTermLower) || user.email.toLowerCase().includes(searchTermLower))
      .map((user) => ({ ...user, isFriend: false, isOnline: user.isOnline || false }))
      .filter((user) => !this.friends.some((friend) => friend.id === user.id));

    this.filteredUser = [...friendsFiltered, ...usersFiltered].sort((a, b) => {
      if (a.isFriend && !b.isFriend) return -1;
      if (!a.isFriend && b.isFriend) return 1;
      if (a.isOnline && !b.isOnline) return -1;
      if (!a.isOnline && b.isOnline) return 1;
      return 0;
    });

    console.log(this.filteredUser);
  }

  startConversation(id: number) {
    console.log(id);
  }
}
