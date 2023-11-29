import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSuccessData } from '../../shared/models/loginsuccess.model';
import { map } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ResetPassword } from '../../shared/models/resetpassword.model';

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
    body : User
  ) {
    return this.http.post('http://localhost:8080/guest/register', body)
  }

  sendResetPasswordLink(email: string) {
    return this.http.post(`http://localhost:8080/guest/users/restartpassword/${email}`, null);
  }

  getToken(): string | null {    
    return localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  checkUuid(uuid? : string) {
    return this.http.get(`http://localhost:8080/guest/users/restartpassword/${uuid}`)
  }

  resetPassword(body : ResetPassword) {
    return this.http.put('http://localhost:8080/guest/users/restartpassword', body)
  }
}
