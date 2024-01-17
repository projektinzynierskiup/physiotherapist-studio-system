import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorkDay } from '../../shared/models/workday.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  getCalendar(startDate : string) {

   const headers = new HttpHeaders({
    'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
   });


    return this.http.get(`/mod/calendar/${startDate}`, { headers })
  }

  deleteAppointment(id : number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`/mod/appointment/${id.toString()}`,  { headers })
  }

  cancelAppointment(id : number) {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.put(`/mod/appointment/${id.toString()}/cancel`, headers )
  }

  finishAppointment(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  
    return this.http.put(`/mod/appointment/${id}/finished`, {}, { headers });
  }

  addFreeSlot(startDate?: string, endDate?: string) {
    const body = {
      startDate: startDate,
      endDate: endDate
    }

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`/mod/appointment/date`, body, { headers })
  }

  addFreeSlots(body :WorkDay[]) {
    console.log(localStorage.getItem('token'))

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.post(`/mod/appointment/list`, body, { headers })
  }

}
