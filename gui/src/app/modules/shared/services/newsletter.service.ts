import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Newsletter } from "../models/newsletter.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class NewsletterService {

    constructor(
        private http: HttpClient
    ){}

    signToNewsletter(userEmail: string): Observable<Newsletter> {
        return this.http.post<Newsletter>(`http://localhost:8080/guest/newsletter`, {userEmail});
    }

    signOutFromNewsletter(email: string) {
        return this.http.delete<Newsletter>(`http://localhost:8080/guest/newsletter/email/${email}`);
    }
    
    isUserInNewsletter(email : string) {
        return this.http.get(`http://localhost:8080/guest/newsletter/${email}`)
    }

    cancelNewsletter(uuid? : string) {
        return this.http.delete(`http://localhost:8080/guest/newsletter/${uuid}`);
    }
  }  