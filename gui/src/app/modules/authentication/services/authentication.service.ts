import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSuccessData } from '../../shared/models/loginsuccess.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string | undefined, password: string | undefined) {

    const body = { email, password };

    return this.http.post('http://localhost:8080/guest/login', body)
  }

  register(
    email: string | undefined, 
    password: string | undefined,
    username: string | undefined,
    surname: string | undefined
  ) {

    const body = { email, password, username, surname };

    return this.http.post('http://localhost:8080/guest/register', body)
  }

  getToken(): string | null {    
    return localStorage.getItem('token');
  }

}
