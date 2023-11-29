import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../../shared/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAvailableAppointments() {
    return this.http.get("http://localhost:8080/guest/appointment/all/free")
  }

  bookAppointment(body : Appointment) {
    if(body.userId) {
      return this.http.put(`http://localhost:8080/guest/appointment/${body.id}/book`, body)
    } else {
      return this.http.put(`http://localhost:8080/guest/appointment/${body.id}/book/guest`, body)
    }
  }
}
