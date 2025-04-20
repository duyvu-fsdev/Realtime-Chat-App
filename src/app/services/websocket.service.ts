import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { AccountService } from "./account.service";
import { NotificationService } from "./notification.service";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  WS_SERVER = environment.WS_SERVER;
  private socket!: WebSocket;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 15;
  constructor(private account: AccountService, private notification: NotificationService, private storage: StorageService) {}

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return;
    this.socket = new WebSocket(`${this.WS_SERVER}?userId=${this.account.currentUser?.id}`);
    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "SOCKET_ID" && data.socketId) this.setSocketId(data.socketId);
      this.handleIncomingMessage(data);
    };

    this.socket.onerror = (error) => console.error("WebSocket error:", error);
    this.socket.onclose = () => {
      console.log("WebSocket disconnected!");

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), 3000);
      } else {
        console.log("🚫 Đã đạt giới hạn thử lại, không kết nối nữa!");
      }
    };
  }

  private handleIncomingMessage(message: any) {
    switch (message.type) {
      case "NEW_MESSAGE":
        console.log("📩 Tin nhắn mới:", message.data);
        this.notification.showToast(`Nhận tin nhắn mới từ ${"ABDC"}`, "primary");
        break;
      case "SOCKET_ID":
        // this.notification.showToast(`Nhận tin nhắn mới từ ${"ABDC"}`, "primary");
        break;
      case "USER_JOIN":
        console.log("👤 Người dùng mới tham gia:", message.data);
        break;
      case "USER_TYPING":
        console.log("⌨️ Ai đó đang nhập...");
        break;
      case "MESSAGE_READ":
        console.log("✅ Tin nhắn đã đọc:", message.data);
        break;
      default:
        console.log("ℹ️ Sự kiện không xác định:", message);
    }
  }

  async sendEvent(data: any) {
    try {
      const socketId = await this.getSocketId();
      if (this.socket.readyState === WebSocket.OPEN && socketId) this.socket.send(JSON.stringify({ ...data, senderSocketId: socketId }));
    } catch (error) {
      throw error;
    }
  }

  disconnect() {
    this.socket?.close();
  }

  async setSocketId(value: string) {
    await this.storage.setStorage("socketId", value);
  }
  async getSocketId() {
    try {
      return await this.storage.getStorage("socketId");
    } catch (error) {
      console.error("Lỗi khi lấy socketId:", error);
      return null;
    }
  }
}
