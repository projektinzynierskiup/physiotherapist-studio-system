import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()

export class RoleGuard implements CanActivate {

  constructor(public authentication: AuthenticationService,
    private authorizationService: AuthorizationService,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
   console.log(route)
    const permissions = route.data['permissions'];
    if (this.authorizationService.hasPermission(permissions)) {
      if (route.routeConfig?.path) {
        return true;
      } {
         return false;
      }
    } else {
      return false;
    }
  }
}
