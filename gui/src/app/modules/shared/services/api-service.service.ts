import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Day} from "../models/day";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private readonly API_URL = 'http://localhost:8080/guest/calendar';
  constructor(private http: HttpClient) {}

  getDataForWeek(startDate: string): Observable<Day[]> {
    return this.http.get<Day[]>(`${this.API_URL}?startDate=${startDate}`);
  }
}
