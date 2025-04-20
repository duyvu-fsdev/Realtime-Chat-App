import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConnectionService {
  API_SERVER = environment.API_SERVER;
  constructor(private http: HttpClient) {}

  async getConnectionById(id: number | string) {
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/user/${id}`));
  }

  async getConnectionByIds(userIds: number[] | string[]) {
    return await firstValueFrom(this.http.post(`${this.API_SERVER}/users`, { userIds }));
  }

  async getConnectionByEmailOrName(search: string) {
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/users-filter`, { params: { search } }));
  }

  updateConnection(connectioinId: string, updateData: any) {
    return {};
  }

  async getOrCreateConnection(members: number[]) {
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/login`));
  }

  getConnections(userId: string): any[] {
    return [];
  }
}
