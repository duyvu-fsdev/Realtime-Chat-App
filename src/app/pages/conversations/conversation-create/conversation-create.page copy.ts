// import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import { NavController, IonSearchbar } from "@ionic/angular";
// import { AccountService } from "src/app/services/account.service";
// import { ConnectionService } from "src/app/services/connection.service";
// import { ConversationService } from "src/app/services/conversation.service";
// import { ComponentsModuleShare } from "src/app/share";

// @Component({
//   selector: "app-conversation-create",
//   templateUrl: "./conversation-create.page.html",
//   styleUrls: ["./conversation-create.page.scss"],
//   imports: [ComponentsModuleShare],
// })
// export class ConversationCreatePage implements OnInit {
//   conversationId: string | null = null;
//   filteredUser: Array<any> = [];
//   searchTerm: string = "";
//   friends: Array<any> = [];
//   members: Array<any> = [];

//   constructor(
//     private route: ActivatedRoute,
//     private navCtrl: NavController,
//     private connection: ConnectionService,
//     public account: AccountService,
//     private conversation: ConversationService
//   ) {}

//   ngOnInit() {
//     this.conversationId = this.route.snapshot.paramMap.get("id");
//     this.sortFriendsByOnlineStatus();
//     this.filteredUser = this.friends;
//   }

//   sortFriendsByOnlineStatus() {
//     this.friends.sort((a, b) => {
//       if (a.isOnline && !b.isOnline) return -1;
//       if (!a.isOnline && b.isOnline) return 1;
//       return 0;
//     });
//   }

//   async filterFriends() {
//     if (this.searchTerm.trim()) {
//       this.isOpen = true;
//       const allUsers = (await this.connection.getConnectionByEmailOrName(this.searchTerm)) as any[];
//       this.filteredUser = allUsers.filter(
//         (user) => user.id !== this.account.currentUser.id && !this.members.some((member) => member.id === user.id)
//       );
//       console.log(this.filteredUser);
//     } else {
//       this.isOpen = false;
//       this.filteredUser = [];
//     }
//   }

//   addMember(member: any) {
//     this.members.push(member);
//     this.searchTerm = "";
//     this.filteredUser = [];
//     this.setFocus();
//   }

//   removeMember(id: any) {
//     const index = this.members.findIndex((item) => item.id === id);
//     if (index !== -1) this.members.splice(index, 1);
//   }

//   async create() {
//     const userIds = [...this.members.map((m) => m.id), this.account.currentUser.id];
//     const conversation: any = await this.conversation.getConversationByMembers(userIds);
//     if (conversation) {
//       this.navCtrl.navigateRoot(`/conversations/${conversation.id}`);
//       return;
//     } else {
//       if (userIds.length > 2) {
//         this.navCtrl.navigateRoot(`/conversations/new?groupIds=${userIds.join(",")}`);
//         return;
//       } else {
//         const receiverId = userIds.find((m) => m !== this.account.currentUser.id);
//         this.navCtrl.navigateRoot(`/conversations/new?receiverId=${receiverId}`);
//         return;
//       }
//     }
//   }

//   @ViewChild("searchbar", { static: false }) searchbar!: IonSearchbar;

//   ionViewDidEnter() {
//     this.setFocus();
//   }

//   setFocus() {
//     if (this.searchbar) this.searchbar.setFocus();
//   }

//   isOpen = false;

//   //

//   newMessage: string = "";
//   async onKeydown(event: KeyboardEvent) {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       await this.sendMessage();
//     }
//   }
//   async sendMessage() {
//     if (!this.newMessage.trim()) return;
//     console.log(this.newMessage);

//     // if (!this.messages.length) await this.createConversation();
//     // const mess: any = await this.message.sendMessage(
//     //   this.currentConversation.id,
//     //   this.account.currentUser.id,
//     //   this.messageType,
//     //   this.newMessage
//     // );
//     // this.messages.push(mess);
//     // this.newMessage = "";
//     // this.isTyping = false;
//     // this.scrollToBottom();
//     // console.log(this.messages);
//   }
// }
