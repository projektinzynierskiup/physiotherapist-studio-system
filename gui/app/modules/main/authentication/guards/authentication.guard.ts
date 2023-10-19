import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import 'rxjs/add/operator/filter';
@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    public router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (!this.auth.getToken()) {
      // this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}