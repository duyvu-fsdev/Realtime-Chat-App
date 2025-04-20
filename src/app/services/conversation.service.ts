import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConversationService {
  API_SERVER = environment.API_SERVER;
  constructor(private http: HttpClient) {}

  async getConversationById(id: number | string) {
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/conversation/${id}`));
  }

  updateConversation(conversationId: string, updateData: any): boolean {
    return true;
  }

  async getConversationByMembers(userIds: string[] | number[]) {
    const params = new HttpParams({ fromObject: { userIds: userIds.map((id) => id.toString()) } });
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/conversation`, { params }));
  }

  async getConversations(userId: number | string) {
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/conversations/${userId}`));
  }

  async createConversation(data: any) {
    return await firstValueFrom(this.http.post(`${this.API_SERVER}/conversation`, data));
  }
}
