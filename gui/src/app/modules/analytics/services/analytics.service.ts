import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkDay } from '../../shared/models/workday.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getAnalytics(year : string, month : string) {

   const headers = new HttpHeaders({
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
   });


    return this.http.get(`/mod/statistics?year=${year}&month=${month}`, { headers })
  }

}
