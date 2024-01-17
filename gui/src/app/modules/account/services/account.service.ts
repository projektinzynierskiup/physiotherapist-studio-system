import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   constructor(private http: HttpClient) { }

   getFutureAppointments(userId : number) : Observable<any>  {
      const headers = new HttpHeaders({
         'Access-Control-Allow-Headers': '*',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
      });
   
      return this.http.get(`/user/appointment/future/${userId}`, { headers })
   }

   getFiniskedAppointments(userId : number) : Observable<any>  {
   const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
      });


      return this.http.get(`/user/appointment/past/${userId}`, { headers })
   }

   editUserDetails(user: User) {
      const headers = new HttpHeaders({
         'Access-Control-Allow-Headers': '*',
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
      });
   
      return this.http.put(`/user`, user, { headers })
   }
}
