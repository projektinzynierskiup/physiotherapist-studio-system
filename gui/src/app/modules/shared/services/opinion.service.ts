import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OpinionPage} from "../models/opinion-page";

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  private baseUrl = 'http://localhost:8080/guest/opinion'; // adres URL do API

  constructor(private http: HttpClient) { }

  getOpinions(page: number): Observable<OpinionPage> {
    return this.http.get<OpinionPage>(`${this.baseUrl}/${page}`);
  }

  createOpinion(opinionDTO: any): Observable<string> {
    return this.http.post<string>(this.baseUrl, opinionDTO);
  }
}
