import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ComponentsModuleShare } from "src/app/share";
import { NavController } from "@ionic/angular";
import { ConnectionService } from "src/app/services/connection.service";

@Component({
  selector: "app-connections",
  templateUrl: "./connections.page.html",
  styleUrls: ["./connections.page.scss"],
  standalone: true,
  imports: [ComponentsModuleShare],
})
export class ConnectionsPage implements OnInit {
  conversationId: string | null = null;
  filteredUser: Array<any> = [];
  searchTerm: string = "";
  friends: Array<any> = [];

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private connection: ConnectionService) {}

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

  async filterFriends() {
    // if (this.searchTerm.trim() === "") {
    //   this.filteredUser = this.friends;
    //   return;
    // }
    // const searchTermLower = this.searchTerm.toLowerCase();
    // const friendsFiltered = this.friends
    //   .filter((friend) => friend.name.toLowerCase().includes(searchTermLower) || friend.email.toLowerCase().includes(searchTermLower))
    //   .map((friend) => ({ ...friend, isFriend: true, isOnline: friend.isOnline || false }));
    // const usersFiltered = this.tmp.listUser
    //   .filter((user) => user.displayName.toLowerCase().includes(searchTermLower) || user.email.toLowerCase().includes(searchTermLower))
    //   .map((user) => ({ ...currentUser, isFriend: false, isOnline: user.isOnline || false }))
    //   .filter((user) => !this.friends.some((friend) => friend.id === user.id));

    // this.filteredUser = [...friendsFiltered, ...currentUsersFiltered].sort((a, b) => {
    //   if (a.isFriend && !b.isFriend) return -1;
    //   if (!a.isFriend && b.isFriend) return 1;
    //   if (a.isOnline && !b.isOnline) return -1;
    //   if (!a.isOnline && b.isOnline) return 1;
    //   return 0;
    // });

    if (this.searchTerm.trim()) {
      this.filteredUser = (await this.connection.getConnectionByEmailOrName(this.searchTerm)) as any[];
      console.log(this.searchTerm);
    } else {
      this.filteredUser = [];
    }
  }

  goto(id: number) {
    this.navCtrl.navigateRoot(`/connections/${id}`);
  }
}
