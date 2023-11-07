import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getAvailableAppointments() {
    return this.http.get("http://localhost:8080/guest/appointment/all/free")
  }
}
