// import { Component, OnInit, ViewChild } from "@angular/core";
// import { ActivatedRoute } from "@angular/router";
// import { IonContent, NavController, MenuController } from "@ionic/angular";
// import { AccountService } from "src/app/services/account.service";
// import { ConnectionService } from "src/app/services/connection.service";
// import { ConversationService } from "src/app/services/conversation.service";
// import { MessageService } from "src/app/services/message.service";
// import { WebsocketService } from "src/app/services/websocket.service";
// import { ComponentsModuleShare } from "src/app/share";

// @Component({
//   selector: "app-conversation",
//   templateUrl: "./conversation-detail.page.html",
//   styleUrls: ["./conversation-detail.page.scss"],
//   imports: [ComponentsModuleShare],
// })
// export class ConversationDetailPage implements OnInit {
//   @ViewChild(IonContent) contentEl!: IonContent;
//   currentConversation: any;
//   messages: any[] = [];
//   newMessage: string = "";
//   groupUsers: any[] = [];
//   messageType: string = "Text";
//   isTyping = false;
//   typingUser: string | null = null;
//   typingTimeout: any;
//   userTyping: any;
//   isLoaded = false;

//   constructor(
//     private websocket: WebsocketService,
//     private route: ActivatedRoute,
//     public account: AccountService,
//     private conversation: ConversationService,
//     private connection: ConnectionService,
//     protected navCtrl: NavController,
//     private message: MessageService,
//     private menuCtrl: MenuController
//   ) {}

//   async ngOnInit() {
//     this.route.queryParams.subscribe(async (params) => {
//       const receiverId = params["receiverId"] ? params["receiverId"] : null;
//       const groupIds: any[] | null = params["groupIds"] ? params["groupIds"].split(",") : null;

//       if (!!receiverId || !!groupIds)
//         try {
//           if (!!receiverId) {
//             const member = await this.connection.getConnectionById(receiverId);
//             this.groupUsers = [member, this.account.currentUser];
//           }
//           if (!!groupIds) {
//             const members: any = await this.connection.getConnectionByIds(groupIds);
//             this.groupUsers = members;
//           }
//           const userIds = this.groupUsers.map((u) => u.id);
//           const conversation: any = await this.conversation.getConversationByMembers(userIds);
//           if (conversation) this.navCtrl.navigateRoot(`/conversations/${conversation.id}`);
//           else {
//             const isGroup = userIds.length > 2;
//             const createBy = isGroup ? this.account.currentUser.id : null;
//             const conversationMembers = this.groupUsers;
//             this.currentConversation = { isGroup, createBy, conversationMembers, ...this.generateGroupNameThumb(this.groupUsers) };
//             console.log(this.currentConversation);
//           }
//           return;
//         } catch (error) {
//           console.log(error);
//           this.navCtrl.navigateRoot(`/conversations`);
//         } finally {
//           this.isLoaded = true;
//         }
//       else {
//         const conversationId = this.route.snapshot.paramMap.get("id");
//         if (conversationId)
//           try {
//             const conversation: any = await this.conversation.getConversationById(conversationId);
//             if (conversation) {
//               const mess: any = await this.message.getMessages(conversation.id);
//               this.messages = mess;
//               this.groupUsers = conversation.conversationMembers.map((u: any) => {
//                 const { user, id, userId, ...data } = u;
//                 return { ...data, ...user, id: userId };
//               });
//               this.currentConversation = {
//                 ...conversation,
//                 ...this.generateGroupNameThumb(this.groupUsers),
//                 conversationMembers: this.groupUsers,
//               };
//             }
//             console.log(this.currentConversation, this.groupUsers);
//           } catch (error) {
//             this.isLoaded = true;
//             this.navCtrl.navigateRoot(`/conversations`);
//           } finally {
//             this.isLoaded = true;
//           }
//         else {
//           this.isLoaded = true;
//           this.navCtrl.navigateRoot(`/conversations`);
//         }
//       }
//     });
//     this.listenForNewMessages();
//   }

//   generateGroupNameThumb(members: any[]): { name: string; chatThumbnail: string[] } {
//     const otherMembers = members.filter((m) => m.id !== this.account.currentUser.id);
//     const chatThumbnail = otherMembers.length > 1 ? [otherMembers[0].avatar, otherMembers[1].avatar] : [otherMembers[0].avatar];
//     if (otherMembers.length === 1) return { name: otherMembers[0].firstName, chatThumbnail };
//     if (otherMembers.length === 2) return { name: `${otherMembers[0].firstName} & ${otherMembers[1].firstName}`, chatThumbnail };
//     if (otherMembers.length === 3)
//       return { name: `${otherMembers[0].firstName}, ${otherMembers[1].firstName} & ${otherMembers.length - 2} other`, chatThumbnail };
//     return { name: `${otherMembers[0].firstName}, ${otherMembers[1].firstName} & ${otherMembers.length - 2} others`, chatThumbnail };
//   }

//   async sendMessage() {
//     if (!this.newMessage.trim()) return;
//     if (!this.messages.length) await this.createConversation();
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

//   async onKeydown(event: KeyboardEvent) {
//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();
//       await this.sendMessage();
//     } else {
//       if (this.newMessage.trim()) {
//         this.websocket.sendEvent({
//           type: "USER_TYPING",
//           data: { conversationId: this.currentConversation.id, userName: this.account.currentUser.displayName },
//         });
//       }
//     }
//   }

//   async createConversation() {
//     console.log(this.currentConversation);

//     const userIds = this.groupUsers.map((u) => u.id);
//     console.log(userIds);

//     // this.currentConversation = await this.conversation.createConversation(userIds);
//   }

//   listenForNewMessages() {
//     this.websocket["handleIncomingMessage"] = (message: any) => {
//       if (message.type === "NEW_MESSAGE") {
//         if (message.fromSelf) return;
//         this.messages.push(message.data);
//         this.isTyping = false;
//         this.scrollToBottom();
//       } else if (message.type === "USER_TYPING" && message.data.conversationId === this.currentConversation.id) {
//         this.userTyping = message.data.userName;
//         this.isTyping = true;
//         clearTimeout(this.typingTimeout);
//         this.typingTimeout = setTimeout(() => {
//           this.isTyping = false;
//           this.userTyping = null;
//         }, 3000);
//       }
//     };
//   }

//   scrollToBottom() {
//     if (this.contentEl) {
//       setTimeout(() => this.contentEl.scrollToBottom(300), 100);
//     }
//   }

//   isSameDay(date1: string, date2: string): boolean {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     return d1.toDateString() === d2.toDateString();
//   }

//   formatDate(date: string): string {
//     return new Date(date).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
//   }

//   formatTime(date: string): string {
//     return new Date(date).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
//   }

//   selectedMessageIndex: number | null = null;

//   toggleMessageInfo(index: number) {
//     this.selectedMessageIndex = this.selectedMessageIndex === index ? null : index;
//   }

//   showInfo = false;

//   toggleShowInfo() {
//     this.showInfo = !this.showInfo;
//   }

//   closeSidebar() {
//     this.showInfo = false;
//   }

//   //

//   catalogies = [
//     { id: 1, name: "Category 1", products: [{ name: "Product 1" }, { name: "Product 2" }, { name: "Product 3" }, { name: "Product 4" }] },
//     { id: 2, name: "Category 2", products: [{ name: "Product 5" }, { name: "Product 6" }, { name: "Product 7" }, { name: "Product 8" }] },
//     {
//       id: 3,
//       name: "Category 3",
//       products: [{ name: "Product 9" }, { name: "Product 10" }, { name: "Product 11" }, { name: "Product 12" }],
//     },
//     {
//       id: 4,
//       name: "Category 4",
//       products: [{ name: "Product 13" }, { name: "Product 14" }, { name: "Product 15" }, { name: "Product 16" }],
//     },
//   ];

//   ex: string = "";

//   toggleCategory(ex: string) {
//     if (this.ex === ex) this.ex = "";
//     else this.ex = ex;
//   }
// }
