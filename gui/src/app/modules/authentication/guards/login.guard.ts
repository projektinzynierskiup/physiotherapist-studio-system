import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
// import 'rxjs/add/operator/filter';
@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public auth: AuthenticationService,
    public router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if (this.auth.getToken()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }
}
