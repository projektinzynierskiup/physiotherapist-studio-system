import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getCalendar(startDate : string) {

   const headers = new HttpHeaders({
     'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
   });


    return this.http.get(`http://localhost:8080/mod/calendar/${startDate}`, { headers })
  }

}
