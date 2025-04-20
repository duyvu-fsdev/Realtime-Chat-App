import { Injectable } from "@angular/core";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  gender: string;
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
    {
      id: 21,
      firstName: "Uma",
      lastName: "Young",
      displayName: "Young Uma",
      email: "uma@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 22,
      firstName: "Victor",
      lastName: "Hernandez",
      displayName: "Hernandez Victor",
      email: "victor@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 23,
      firstName: "Wendy",
      lastName: "King",
      displayName: "King Wendy",
      email: "wendy@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 24,
      firstName: "Xander",
      lastName: "Wright",
      displayName: "Wright Xander",
      email: "xander@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 25,
      firstName: "Yara",
      lastName: "Lopez",
      displayName: "Lopez Yara",
      email: "yara@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 26,
      firstName: "Zane",
      lastName: "Hill",
      displayName: "Hill Zane",
      email: "zane@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 27,
      firstName: "Amy",
      lastName: "Scott",
      displayName: "Scott Amy",
      email: "amy@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 28,
      firstName: "Brian",
      lastName: "Green",
      displayName: "Green Brian",
      email: "brian@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 29,
      firstName: "Cathy",
      lastName: "Adams",
      displayName: "Adams Cathy",
      email: "cathy@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 30,
      firstName: "Derek",
      lastName: "Baker",
      displayName: "Baker Derek",
      email: "derek@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 31,
      firstName: "Ella",
      lastName: "Nelson",
      displayName: "Nelson Ella",
      email: "ella@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 32,
      firstName: "Frank",
      lastName: "Carter",
      displayName: "Carter Frank",
      email: "frank@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 33,
      firstName: "Gina",
      lastName: "Mitchell",
      displayName: "Mitchell Gina",
      email: "gina@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 34,
      firstName: "Harry",
      lastName: "Perez",
      displayName: "Perez Harry",
      email: "harry@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 35,
      firstName: "Ivy",
      lastName: "Roberts",
      displayName: "Roberts Ivy",
      email: "ivy@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 36,
      firstName: "Jack",
      lastName: "Turner",
      displayName: "Turner Jack",
      email: "jack@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 37,
      firstName: "Kara",
      lastName: "Phillips",
      displayName: "Phillips Kara",
      email: "kara@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 38,
      firstName: "Liam",
      lastName: "Campbell",
      displayName: "Campbell Liam",
      email: "liam@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 39,
      firstName: "Mia",
      lastName: "Parker",
      displayName: "Parker Mia",
      email: "mia@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 40,
      firstName: "Noah",
      lastName: "Evans",
      displayName: "Evans Noah",
      email: "noah@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 1,
      firstName: "Alice",
      lastName: "Smith",
      displayName: "Smith Alice",
      email: "alice@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Johnson",
      displayName: "Johnson Bob",
      email: "bob@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 3,
      firstName: "Charlie",
      lastName: "Brown",
      displayName: "Brown Charlie",
      email: "charlie@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 4,
      firstName: "David",
      lastName: "Williams",
      displayName: "Williams David",
      email: "david@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 5,
      firstName: "Eve",
      lastName: "Jones",
      displayName: "Jones Eve",
      email: "eve@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 6,
      firstName: "Frank",
      lastName: "Garcia",
      displayName: "Garcia Frank",
      email: "frank@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 7,
      firstName: "Grace",
      lastName: "Martinez",
      displayName: "Martinez Grace",
      email: "grace@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 8,
      firstName: "Hank",
      lastName: "Rodriguez",
      displayName: "Rodriguez Hank",
      email: "hank@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 9,
      firstName: "Ivy",
      lastName: "Wilson",
      displayName: "Wilson Ivy",
      email: "ivy@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 10,
      firstName: "Jack",
      lastName: "Lopez",
      displayName: "Lopez Jack",
      email: "jack@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 11,
      firstName: "Karen",
      lastName: "Gonzalez",
      displayName: "Gonzalez Karen",
      email: "karen@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 12,
      firstName: "Leo",
      lastName: "Perez",
      displayName: "Perez Leo",
      email: "leo@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 13,
      firstName: "Mona",
      lastName: "Sanchez",
      displayName: "Sanchez Mona",
      email: "mona@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 14,
      firstName: "Nina",
      lastName: "Clark",
      displayName: "Clark Nina",
      email: "nina@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 15,
      firstName: "Oscar",
      lastName: "Ramirez",
      displayName: "Ramirez Oscar",
      email: "oscar@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 16,
      firstName: "Paul",
      lastName: "Lewis",
      displayName: "Lewis Paul",
      email: "paul@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: true,
      gender: "male",
    },
    {
      id: 17,
      firstName: "Quinn",
      lastName: "Lee",
      displayName: "Lee Quinn",
      email: "quinn@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: false,
      gender: "female",
    },
    {
      id: 18,
      firstName: "Rachel",
      lastName: "Walker",
      displayName: "Walker Rachel",
      email: "rachel@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
    {
      id: 19,
      firstName: "Steve",
      lastName: "Hall",
      displayName: "Hall Steve",
      email: "steve@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      isOnline: false,
      gender: "male",
    },
    {
      id: 20,
      firstName: "Tina",
      lastName: "Allen",
      displayName: "Allen Tina",
      email: "tina@example.com",
      avatar: "https://www.w3schools.com/howto/img_avatar2.png",
      isOnline: true,
      gender: "female",
    },
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
    {
      id: 5,
      conversationId: 3,
      senderId: 2,
      messageType: "text",
      content:
        "Sắp xếp đơn vị hành chính cấp tỉnh cần căn cứ trên một số tiêu chí quan trọng là diện tích, dân số, kinh tế, văn hóa và khả năng bổ sung, hỗ trợ cho nhau phát triển, theo Thủ tướng. <br> Chiều 5/3, Thủ tướng Phạm Minh Chính chủ trì họp Ban Thường vụ Đảng ủy Chính phủ để thảo luận, cho ý kiến về đề án sắp xếp, tổ chức lại đơn vị hành chính các cấp và xây dựng chính quyền địa phương hai cấp để chuẩn bị trình cấp có thẩm quyền. Sau khi nghe báo cáo của Bộ Nội vụ và ý kiến đại biểu, Thường vụ Đảng ủy Chính phủ thống nhất mô hình chính quyền địa phương hai cấp, đó là cấp tỉnh (gồm các tỉnh, thành phố trực thuộc Trung ương) và cấp cơ sở. Đảng ủy Chính phủ cũng thảo luận về các phương án dự kiến sáp nhập một số đơn vị cấp tỉnh, không tổ chức cấp huyện, sáp nhập một số đơn vị cấp xã. Cùng với lưu ý tiêu chí sáp nhập một số tỉnh, Thủ tướng yêu cầu Bộ Nội vụ, các cơ quan sớm hoàn thiện đề án để báo cáo Bộ Chính trị cho ý kiến.",
      readBy: ["4", "5"],
    },
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
  getUserById(id: number) {
    return this.listUser.find((u) => u.id === id);
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
