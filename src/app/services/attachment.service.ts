import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AttachmentService {
  API_SERVER = environment.API_SERVER;

  constructor(private http: HttpClient) {}

  async getAttachment(id: number) {
    return await firstValueFrom(this.http.get(`${this.API_SERVER}/attachment/${id}`));
  }
}
