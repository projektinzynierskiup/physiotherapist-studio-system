import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private authenticationService: AuthenticationService) { }

  hasPermission(definedRole : string[]) {
    const userRole = this.authenticationService.getUserRole()
    if(userRole) {

      if(definedRole.find(role => role == userRole)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
