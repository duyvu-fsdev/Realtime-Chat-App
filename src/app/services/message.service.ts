import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

export interface Message {
  conversationId: string | number;
  senderId: string | number;
  messageType: string;
  content: string;
  replyTo: null | string | number;
}

@Injectable({
  providedIn: "root",
})
export class MessageService {
  API_SERVER = environment.API_SERVER;

  constructor(private http: HttpClient) {}

  async sendMessage(message: any) {
    console.log(message);
    return await firstValueFrom(this.http.post(`${this.API_SERVER}/message`, message));
  }

  async getMessages(conversationId: string | number, offset: number = 0, limit?: any) {
    const params = new HttpParams({ fromObject: { conversationId, offset, limit: limit || undefined } });
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/messages/${conversationId}`, { params }));
  }
}
