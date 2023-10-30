import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getModifyToken(token : string) {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);
    
    // Other functions
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    console.log(decodedToken)
    console.log(expirationDate)
    console.log(isExpired)

    return decodedToken
  }
}
