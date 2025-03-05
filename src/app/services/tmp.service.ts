import { Injectable } from "@angular/core";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
}

interface Conversation {
  lastChat: Date;
  id: number;
  name: string | null;
  isGroup: boolean;
  createdBy: string;
}

interface ConversationMember {
  id: number;
  userId: number;
  conversationId: number;
  joinedAt: Date;
}

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  messageType: "text" | "image" | "video";
  content: string;
  readBy: string[];
}
@Injectable({
  providedIn: "root",
})
export class TmpService {
  litsConversationMember: ConversationMember[] = [
    { id: 1, userId: 2, conversationId: 1, joinedAt: new Date() }, // Bob in 1-on-1 chat with Alice
    { id: 2, userId: 1, conversationId: 1, joinedAt: new Date() }, // Alice in 1-on-1 chat with Bob
    { id: 3, userId: 2, conversationId: 2, joinedAt: new Date() }, // Bob in 1-on-1 chat with Charlie
    { id: 4, userId: 3, conversationId: 2, joinedAt: new Date() }, // Charlie in 1-on-1 chat with Bob
    { id: 5, userId: 2, conversationId: 3, joinedAt: new Date() }, // Bob in group chat
    { id: 6, userId: 4, conversationId: 3, joinedAt: new Date() }, // David in group chat
    { id: 7, userId: 5, conversationId: 3, joinedAt: new Date() }, // Eve in group chat
  ];

  listUser: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 2, name: "Bob", email: "bob@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 3, name: "Charlie", email: "charlie@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 4, name: "David", email: "david@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 5, name: "Eve", email: "eve@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 6, name: "Frank", email: "frank@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 7, name: "Grace", email: "grace@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 8, name: "Hank", email: "hank@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 9, name: "Ivy", email: "ivy@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 10, name: "Jack", email: "jack@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 11, name: "Karen", email: "karen@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 12, name: "Leo", email: "leo@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 13, name: "Mona", email: "mona@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 14, name: "Nina", email: "nina@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 15, name: "Oscar", email: "oscar@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 16, name: "Paul", email: "paul@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 17, name: "Quinn", email: "quinn@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 18, name: "Rachel", email: "rachel@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
    { id: 19, name: "Steve", email: "steve@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: false },
    { id: 20, name: "Tina", email: "tina@example.com", avatar: "https://www.w3schools.com/howto/img_avatar.png", isOnline: true },
  ];

  listFriend: User[] = this.listUser.filter((user) => [4, 5, 6, 7, 8, 9, 10, 11, 3].includes(user.id));

  listConversation: Conversation[] = [
    { id: 2, name: null, isGroup: false, createdBy: "2", lastChat: new Date("2023-01-02T11:00:00") },
    { id: 3, name: "Group chat no.1", isGroup: true, createdBy: "2", lastChat: new Date("2023-01-03T12:00:00") },
    { id: 1, name: null, isGroup: false, createdBy: "2", lastChat: new Date("2023-01-04T10:00:00") },
  ];

  listMessage: Message[] = [
    { id: 1, conversationId: 1, senderId: 2, messageType: "text", content: "Hi Alice!", readBy: ["1"] },
    { id: 2, conversationId: 1, senderId: 1, messageType: "text", content: "Hello Bob!", readBy: ["2"] },
    { id: 3, conversationId: 2, senderId: 2, messageType: "text", content: "Hey Charlie!", readBy: ["3"] },
    { id: 4, conversationId: 2, senderId: 3, messageType: "text", content: "Hi Bob!", readBy: ["2"] },
    { id: 5, conversationId: 3, senderId: 2, messageType: "text", content: "Welcome to the group chat!", readBy: ["4", "5"] },
    { id: 6, conversationId: 3, senderId: 4, messageType: "text", content: "Thanks Bob!", readBy: ["2", "5"] },
    { id: 7, conversationId: 3, senderId: 5, messageType: "text", content: "Hello everyone!", readBy: ["2", "4"] },
    { id: 8, conversationId: 1, senderId: 2, messageType: "text", content: "How are you?", readBy: ["1"] },
    { id: 9, conversationId: 1, senderId: 1, messageType: "text", content: "I'm good, thanks!", readBy: ["2"] },
    { id: 10, conversationId: 2, senderId: 3, messageType: "text", content: "What's up?", readBy: ["2"] },
    { id: 11, conversationId: 2, senderId: 2, messageType: "text", content: "Not much, you?", readBy: ["3"] },
    { id: 12, conversationId: 3, senderId: 5, messageType: "text", content: "Anyone here?", readBy: ["2", "4"] },
    { id: 13, conversationId: 3, senderId: 4, messageType: "text", content: "Yes, I'm here!", readBy: ["2", "5"] },
    { id: 14, conversationId: 3, senderId: 2, messageType: "text", content: "Great!", readBy: ["4", "5"] },
    { id: 15, conversationId: 1, senderId: 1, messageType: "text", content: "See you later!", readBy: ["2"] },
    { id: 16, conversationId: 1, senderId: 1, messageType: "text", content: "See you later 1!", readBy: ["2"] },
    { id: 17, conversationId: 1, senderId: 2, messageType: "text", content: "Bye!", readBy: ["1"] },
    { id: 17, conversationId: 1, senderId: 2, messageType: "text", content: "Bye!", readBy: ["1"] },
    { id: 17, conversationId: 1, senderId: 2, messageType: "text", content: "Bye!", readBy: ["1"] },
    { id: 17, conversationId: 1, senderId: 2, messageType: "text", content: "Bye!", readBy: ["1"] },
    { id: 18, conversationId: 2, senderId: 3, messageType: "text", content: "Catch you later!", readBy: ["2"] },
    { id: 19, conversationId: 2, senderId: 2, messageType: "text", content: "Sure!", readBy: ["3"] },
    { id: 20, conversationId: 3, senderId: 5, messageType: "text", content: "Goodbye everyone!", readBy: ["2", "4"] },
    { id: 21, conversationId: 3, senderId: 4, messageType: "text", content: "Goodbye!", readBy: ["2", "5"] },
  ];

  getUsers() {
    return this.listUser;
  }

  getFriends() {
    return this.listFriend;
  }

  getConversations() {
    return this.listConversation;
  }

  getMessagesByConversationId(conversationId: number): Message[] {
    return this.listMessage.filter((message) => message.conversationId === conversationId);
  }

  getMessages() {
    return this.listMessage;
  }

  getConversationMembers() {
    return this.litsConversationMember;
  }

  getConversation(id: number): Conversation | undefined {
    return this.listConversation.find((conversation) => conversation.id === id);
  }
}
