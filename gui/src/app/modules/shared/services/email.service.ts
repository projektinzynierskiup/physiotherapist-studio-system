
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Newsletter } from "../models/newsletter.model";
import { Observable } from "rxjs";
import { Email } from "../models/email.model";

@Injectable({
    providedIn: 'root'
  })
  export class EmailService {

    constructor(
        private http: HttpClient
    ){}

    sendEmail(email: Email) {
        return this.http.post(`http://localhost:8080/guest/email/confirmation`, email);
    }

  }  