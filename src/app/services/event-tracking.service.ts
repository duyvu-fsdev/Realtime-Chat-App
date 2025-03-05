import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventTrackingService {
  public EventTracking = new Subject<{ Code: string; Value?: any }>();

  constructor() {}

  publishEvent(data: { Code: string; Value?: any }) {
    console.log(data.Code);
    this.EventTracking.next(data);
  }

  getEvents(): Subject<{ Code: string; Value?: any }> {
    return this.EventTracking;
  }
}
