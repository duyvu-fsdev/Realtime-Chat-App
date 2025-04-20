import { Component, ElementRef, OnInit, ViewChild, NgZone } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController, ToastController, IonContent, MenuController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { AccountService } from "src/app/services/account.service";
import { AuthService } from "src/app/services/auth.service";
import { ConnectionService } from "src/app/services/connection.service";
import { ConversationService } from "src/app/services/conversation.service";
import { EventTrackingService } from "src/app/services/event-tracking.service";
import { LoadingService } from "src/app/services/loading.service";
import { MessageService } from "src/app/services/message.service";
import { NotificationService } from "src/app/services/notification.service";
import { StorageService } from "src/app/services/storage.service";
import { WebsocketService } from "src/app/services/websocket.service";
import { IonTextarea, IonSearchbar } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { AttachmentService } from "src/app/services/attachment.service";

@Component({ template: "" })
export abstract class ConversationBasePage implements OnInit {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef;

  currentConversation: any = null;
  conversationId: string | null = null;
  members: any[] = [this.account.currentUser];
  otherMembers: any[] = [];
  messages: any[] = [];
  newMessage: string = "";
  messageType: string = "Text";
  isTyping = false;
  typingUser: string | null = null;
  typingTimeout: any;
  userTyping: any;
  isLoaded = false;
  pagetitle: string = "";

  //
  initialLoadDone = false;
  DOMAIN = environment.DOMAIN;
  constructor(
    protected formBuilder: FormBuilder,
    protected toastController: ToastController,
    protected route: ActivatedRoute,
    protected navCtrl: NavController,
    protected translate: TranslateService,
    protected loading: LoadingService,
    protected auth: AuthService,
    protected notification: NotificationService,
    protected account: AccountService,
    protected storage: StorageService,
    protected eventTracking: EventTrackingService,
    protected connection: ConnectionService,
    protected conversation: ConversationService,
    protected websocket: WebsocketService,
    protected message: MessageService,
    protected menuCtrl: MenuController,
    protected attachment: AttachmentService
  ) {}

  ngOnInit() {
    this.initPage();
  }

  abstract initPage(): void;

  async getConversationByMembers() {
    if (this.members.length < 2) return;
    const userIds = [...this.members.map((m) => m.id)];
    const conversation: any = await this.conversation.getConversationByMembers(userIds);
    if (conversation) {
      this.conversationId = conversation.id;
      this.setCurrentConversation(conversation);
      const mess: any = await this.getMessages(conversation.id);
      this.messages = mess;
    } else {
      this.messages = [];
      this.conversationId = null;
      const isGroup = userIds.length > 2;
      const createBy = isGroup ? this.account.currentUser.id : null;
      const conversation = { isGroup, createBy, conversationMembers: this.members };
      this.setCurrentConversation(conversation);
    }
  }

  async getConversationById(conversationId: number | string) {
    try {
      const conversation: any = await this.conversation.getConversationById(conversationId);
      const mess: any = await this.getMessages(conversationId);
      this.messages = mess;
      this.scrollToBottom(true, true);
      if (mess.length < 30) this.allMessagesLoaded = true;
      this.members = conversation.conversationMembers.map((u: any) => {
        const { user, id, userId, ...data } = u;
        return { ...data, ...user, id: userId };
      });
      this.setCurrentConversation({ ...conversation, conversationMembers: this.members });
    } catch (error) {
      this.navCtrl.navigateRoot(`/conversations`);
    }
  }

  setCurrentConversation(conversation: any) {
    this.currentConversation = {
      ...conversation,
      ...this.generateGroupNameThumb(this.members),
    };
  }

  async getMessages(conversationId: string | number, offset: number = 0, limit: number = 30) {
    return await this.message.getMessages(conversationId, offset, limit);
  }

  allMessagesLoaded = false;
  isLoadingOldMessages = false;

  async loadMoreMessages() {
    if (!this.conversationId || this.allMessagesLoaded) return;
    const container = this.messagesContainer.nativeElement;
    container.style.scrollBehavior = "auto";
    this.isLoadingOldMessages = true;
    const previousScrollHeight = container.scrollHeight;
    const olderMessages: any = await this.getMessages(this.conversationId, this.messages.length, 30);
    if (olderMessages.length < 30) this.allMessagesLoaded = true;
    this.messages = [...olderMessages, ...this.messages];
    const observer = new ResizeObserver(() => {
      const newScrollHeight = container.scrollHeight;
      const scrollDiff = newScrollHeight - previousScrollHeight;
      container.scrollTop = scrollDiff;
      this.isLoadingOldMessages = false;
      observer.disconnect();
    });
    observer.observe(container);
  }

  setOtherMembers() {
    this.otherMembers = this.members.filter((m) => m.id !== this.account.currentUser.id);

    if (this.otherMembers.length === 0) {
      this.conversationId = null;
      this.messages = [];
      this.currentConversation = null;
    }
  }

  generateGroupNameThumb(members: any[]): { name: string; chatThumbnail: string[] } {
    const otherMembers = members.filter((m) => m.id !== this.account.currentUser.id);
    const chatThumbnail = otherMembers.length > 1 ? [otherMembers[0].avatar, otherMembers[1].avatar] : [otherMembers[0].avatar];
    if (otherMembers.length === 1) return { name: otherMembers[0].firstName, chatThumbnail };
    if (otherMembers.length === 2) return { name: `${otherMembers[0].firstName} & ${otherMembers[1].firstName}`, chatThumbnail };
    if (otherMembers.length === 3)
      return { name: `${otherMembers[0].firstName}, ${otherMembers[1].firstName} & ${otherMembers.length - 2} other`, chatThumbnail };
    return { name: `${otherMembers[0].firstName}, ${otherMembers[1].firstName} & ${otherMembers.length - 2} others`, chatThumbnail };
  }

  //

  goToPage(page: string) {
    this.navCtrl.navigateForward(page);
  }

  isSameDay(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.toDateString() === d2.toDateString();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" });
  }

  formatTime(date: string): string {
    return new Date(date).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  }

  selectedMessageIndex: number | null = null;

  toggleMessageInfo(index: number) {
    this.selectedMessageIndex = this.selectedMessageIndex === index ? null : index;
  }

  async onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await this.submit();
    } else {
      if (this.newMessage.trim()) {
        this.websocket.sendEvent({
          type: "USER_TYPING",
          data: { conversationId: this.currentConversation.id, userName: this.account.currentUser.displayName },
        });
      }
    }
  }

  async submit() {
    if (!(this.newMessage.trim() || this.attachedFiles.length)) return;
    if (this.conversationId) {
      await this.sendMessage();
      this.textareaFocus();
      if (this.pagetitle === "New conversation") this.navCtrl.navigateRoot(`/conversations/${this.conversationId}`);
    } else {
      await this.createConversation();
      await this.sendMessage();
      this.navCtrl.navigateRoot(`/conversations/${this.conversationId}`);
    }
  }

  async createConversation() {
    const userIds = [...this.members.map((m) => m.id), this.account.currentUser.id];
    const { createBy, isGroup } = this.currentConversation;
    console.log(userIds, this.currentConversation);
    this.currentConversation = await this.conversation.createConversation({ userIds, createBy, isGroup });
    this.conversationId = this.currentConversation.id;
  }

  async sendMessage() {
    if (!this.conversationId) return;
    const formData = new FormData();

    formData.append("conversationId", this.conversationId.toString());
    formData.append("senderId", this.account.currentUser.id.toString());
    formData.append("messageType", this.messageType);
    formData.append("content", this.cleanMsgContent(this.newMessage));
    if (this.replyMessageId) {
      formData.append("replyMessageId", this.replyMessageId.toString());
    }
    this.attachedFiles.forEach((f) => formData.append("files", f.file));
    const mess: any = await this.message.sendMessage(formData);
    this.messages.push(...mess);
    this.newMessage = "";
    this.replyToMessage = null;
    this.replyMessageId = null;
    this.attachedFiles = [];
    this.isTyping = false;
    this.scrollToBottom();
  }

  cleanMsgContent(text: string): string {
    const lines = text.split("\n");
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") lines.pop();
    return lines.join("\n");
  }

  sendFiles() {
    for (const f of this.attachedFiles) {
      const formData = new FormData();
      formData.append("file", f.file);
      console.log(formData);
    }
    this.attachedFiles = [];
  }

  listenForNewMessages() {
    this.websocket["handleIncomingMessage"] = (message: any) => {
      if (message.type === "NEW_MESSAGE") {
        if (message.fromSelf) return;
        console.log({ messWS: message.data });
        this.messages.push(message.data);
        this.isTyping = false;
        this.scrollToBottom();
      } else if (message.type === "USER_TYPING" && message.data.conversationId === this.currentConversation.id) {
        this.userTyping = message.data.userName;
        this.isTyping = true;
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
          this.isTyping = false;
          this.userTyping = null;
        }, 3000);
        this.scrollToBottom();
      }
    };
  }

  @ViewChild("textarea", { static: false }) textarea!: IonTextarea;

  textareaFocus() {
    if (this.textarea) this.textarea.setFocus();
  }

  @ViewChild("searchbar", { static: false }) searchbar!: IonSearchbar;

  searchFocus() {
    if (this.searchbar) this.searchbar.setFocus();
  }

  //
  showEmojiPicker = false;
  emojiEvent: any;

  openEmojiPicker(ev: any) {
    this.emojiEvent = ev;
    this.showEmojiPicker = true;
  }

  addEmoji(event: any) {
    const emoji = event.emoji.native || event.emoji;
    this.message += emoji;
    this.showEmojiPicker = false;
  }

  // reply

  replyToMessage: any | null = null;
  replyMessageId!: null | string | number;

  setReplyToMessage(message: any) {
    this.replyToMessage = message;
    if (!!message?.id) this.replyMessageId = message.id;
    this.scrollToBottom();
    this.textareaFocus();
  }

  // file attachment
  attachedFiles: any[] = [];

  onFilesSelected(event: any) {
    const input = event.target as HTMLInputElement;
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const fileType = file.type;
      const fileSize = file.size;

      if (fileType.startsWith("image/")) {
        if (fileSize > 5 * 1024 * 1024) {
          alert(`Ảnh "${file.name}" vượt quá 2MB!`);
          return;
        }
        this.readImage(file);
      } else if (fileType.startsWith("video/")) {
        if (fileSize > 100 * 1024 * 1024) {
          alert(`Video "${file.name}" vượt quá 10MB!`);
          return;
        }
        this.readVideo(file);
      } else {
        this.readOther(file);
      }
    });
    input.value = "";
    this.scrollToBottom();
  }

  readImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.attachedFiles.push({
        type: "image",
        name: file.name,
        preview: reader.result,
        file,
      });
      console.log(this.attachedFiles);
    };
    reader.readAsDataURL(file);
  }

  readVideo(file: File) {
    const url = URL.createObjectURL(file);
    this.attachedFiles.push({
      type: "video",
      name: file.name,
      preview: url,
      file,
    });
  }

  readOther(file: File) {
    this.attachedFiles.push({
      type: "other",
      name: file.name,
      file,
    });
  }

  removeFile(i: any) {
    console.log(i);
    this.attachedFiles.splice(i, 1);
  }

  clearAttachedFiles() {
    this.attachedFiles = [];
  }

  //  scroll

  showScrollToBottomBtn = false;
  firstLoad = false;
  isLoading = false;

  scrollToBottom(force: boolean = false, firstLoad: boolean = false) {
    if (!this.messagesContainer) return;
    const el = this.messagesContainer.nativeElement;
    if (firstLoad) {
      this.firstLoad = firstLoad;
      this.isLoading = true;
      el.style.opacity = 0;
    }
    el.style.scrollBehavior = firstLoad ? "auto" : "smooth";
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isNearBottom = distanceFromBottom < 150;
    if (force || isNearBottom)
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 100);
  }

  onScroll() {
    const el = this.messagesContainer.nativeElement;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    this.showScrollToBottomBtn = distanceFromBottom >= 150 && !this.firstLoad;
    if (this.firstLoad)
      if (distanceFromBottom > 0) {
        el.scrollTop = el.scrollHeight;
      } else {
        this.isLoading = false;
        this.firstLoad = false;
        el.style.opacity = 1;
      }
    if (this.initialLoadDone && el.scrollTop === 0) this.loadMoreMessages();
  }

  ionViewWillEnter() {
    // console.log("ionViewWillEnter");
  }

  ionViewWillLeave() {
    // console.log("ionViewWillLeave");
  }

  // async videoOnError(e: any, a: any) {
  //   try {
  //     const el = e.target as HTMLVideoElement;
  //     console.log(el);

  //     if (!el || !a?.id) return;
  //     const resumeTime = el.currentTime;
  //     const at: any = await this.attachment.getAttachment(a.id);
  //     if (at && at.url) {
  //       el.src = this.DOMAIN + at.url;
  //       el.load();
  //       el.onloadedmetadata = () => {
  //         el.currentTime = resumeTime;
  //         el.play();
  //       };
  //     }
  //   } catch (err) {
  //     console.error("Video load fallback error:", err);
  //   }
  // }

  async videoOnError(e: any, a: any) {
    try {
      const el = e.target as HTMLVideoElement;
      if (!el || !a?.id) return;

      const resumeTime = el.currentTime;

      // ❌ Stop and clean old video
      el.pause();
      el.removeAttribute("src");
      el.load();

      // ✅ Lấy bản mới
      const at: any = await this.attachment.getAttachment(a.id);
      if (at && at.url) {
        el.src = this.DOMAIN + at.url;
        el.load();

        el.onloadedmetadata = () => {
          el.currentTime = resumeTime;
          el.play().catch((err) => {
            console.warn("Video auto-play error:", err);
          });
        };
      }
    } catch (err) {
      console.error("Video fallback error:", err);
    }
  }
}
