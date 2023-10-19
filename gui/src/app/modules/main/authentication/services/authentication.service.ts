import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getToken(): string | null {    
    return localStorage.getItem('token');
  }

}
