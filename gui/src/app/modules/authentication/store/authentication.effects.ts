import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, catchError, map, of, switchMap } from "rxjs";
import { AUTHENTICATION_ACTIONS, Login, LoginSuccess, LoginFailure, RegisterSuccess, RegisterFailure, Register, Logout, LogoutSuccess } from "./authentication.actions";
import { AuthenticationService } from "../services/authentication.service";
import { SharedService } from "../../shared/services/shared.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationEffects {

   constructor(
      private actions: Actions,
      private authenticationService: AuthenticationService,
      private sharedService: SharedService,
      private router: Router,
   ) { }

   login : Observable<any> = createEffect(() => this.actions.pipe(
      ofType<Login>(AUTHENTICATION_ACTIONS.LOGIN),
      map((action: Login) => action.payload),
      switchMap(payload => {
          return this.authenticationService.login(payload.email, payload.password)
              .pipe(
                  map((tokenObject: any) => {
                     const userData : any = this.sharedService.getModifyToken(tokenObject.token)

                     this.updateLocalStorage(userData, tokenObject.token);
                     this.navigateToHome();
                     

                      return new LoginSuccess({ token: tokenObject.token, userData: userData });
                  })
                  , 
                  catchError((err) => {
                    console.log(err);
                    return of(new LoginFailure({ error: err.error, loginFailureInactive: payload.email }));
                 })      
              )
      })
  ));

   register : Observable<any> = createEffect(() => this.actions.pipe(
      ofType<Register>(AUTHENTICATION_ACTIONS.REGISTER),
      map((action: Register) => action.payload),
      switchMap(payload => {
         return this.authenticationService.register(payload.email, payload.password, payload.username, payload.surname)
            .pipe(
                  map((tokenObject: any) => {                     
                     const userData : any = this.sharedService.getModifyToken(tokenObject.token)

                     this.updateLocalStorage(userData, tokenObject.token);
                     this.navigateToHome();
                     
                     return new LoginSuccess({ token: tokenObject.token, userData: userData });
                  }), 
                  catchError((err) => {
                  console.log(err);
                  return of(new RegisterFailure({ error: err.error, loginFailureInactive: payload.email }));
               })      
            )
      })
   ));  

   logout : Observable<any> = createEffect(() => this.actions.pipe(
      ofType<Logout>(AUTHENTICATION_ACTIONS.LOGOUT),
      map((action: Logout) => action),
      switchMap(() => {
                 
         localStorage.removeItem('role');
         localStorage.removeItem('username');
         localStorage.removeItem('token');

         window.location.reload()
         this.navigateToHome()
         return of(new LogoutSuccess())

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