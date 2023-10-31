import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { SharedService } from "../../shared/services/shared.service";
import { Router } from "@angular/router";
import { createAction } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout, logoutSuccess, register, registerFailure, registerSuccess } from './authentication.actions'; // Make sure the path is correct

@Injectable()
export class AuthenticationEffects {

   constructor(
      private actions: Actions,
      private authenticationService: AuthenticationService,
      private sharedService: SharedService,
      private router: Router,
   ) { }

   login$ = createEffect(() => this.actions.pipe(
      ofType(login),
      switchMap(action => {
        const payload = action;
        return this.authenticationService.login(payload.user.email, payload.user.password)
          .pipe(
            map((tokenObject: any) => {
              const userData: any = this.sharedService.getModifyToken(tokenObject.token);

              this.updateLocalStorage(userData, tokenObject.token);
              this.navigateToHome();

              return loginSuccess({ token: tokenObject.token, userData: userData });
            }),
            catchError((err) => {
              console.log(err);
              return of(loginFailure({ error: err.error, email: payload.user.email }));
            })
          );
      })
   ));

   register$ = createEffect(() => this.actions.pipe(
      ofType(register),
      switchMap(action => {
        const payload = action;
        return this.authenticationService.register(payload.user.email, payload.user.password, payload.user.username, payload.user.surname)
          .pipe(
            map(() => {
              this.router.navigate(['/login']);
              return registerSuccess();
            }),
            catchError((err) => {
              console.log(err);
              return of(registerFailure({ error: err.error, email: payload.user.email }));
            })
          );
      })
   ));

   logout$ = createEffect(() => this.actions.pipe(
      ofType(logout),
      switchMap(() => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.reload();
        this.navigateToHome();
        return of(logoutSuccess());
      })
   ));

   private updateLocalStorage(userData: any, token: string): void {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    
      localStorage.setItem('username', userData.username);
      localStorage.setItem('token', token);
      localStorage.setItem('role', userData.role);
    }
    
   private navigateToHome(): void {
      this.router.navigate(['/home']);
   }
}
