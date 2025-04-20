import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ErrorHandlingService {
  constructor() {}

  handleError(errorCode: number) {
    switch (errorCode) {
      case 400:
        console.log("Bad Request. Please check your input.");
        break;
      case 401:
        console.log("Unauthorized. Please log in.");
        break;
      case 403:
        console.log("Forbidden. You do not have permission to perform this action.");
        break;
      case 404:
        console.log("Not Found. The requested resource could not be found.");
        break;
      case 500:
        console.log("Internal Server Error. Please try again later.");
        break;
      default:
        console.log("An unknown error occurred. Please try again.");
        break;
    }
  }
}
