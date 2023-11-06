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

    signOutFromNewsletter(id: string) {
        return this.http.delete<Newsletter>(`apo/guest/newsletter/${id}`);
    }
    
  }  