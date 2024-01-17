import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  constructor(private http: HttpClient) { }

  getOffer() {
    return this.http.get('http://localhost:8080/guest/offer/all')
  }

  getMassage() {
    return this.http.get('http://localhost:8080/guest/massage/all')
  }

  getStatuate() {
    return this.http.get('http://localhost:8080/guest/statuate')
  }
}
