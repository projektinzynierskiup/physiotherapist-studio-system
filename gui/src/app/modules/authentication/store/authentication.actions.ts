import { Action } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export namespace AUTHENTICATION_ACTIONS {
   export const LOGIN = '[Auth] Login Requested';
   export const LOGIN_SUCCESS = '[Auth] Login Success';
   export const LOGIN_FAILURE = '[Auth] Login Failure';
   export const REGISTER = '[Auth] Register Requested';
   export const REGISTER_SUCCESS = '[Auth] Register Success';
   export const REGISTER_FAILURE = '[Auth] Register Failure';
   export const LOGOUT = '[Auth] Logout';
   export const LOGOUT_SUCCESS = '[Auth] Logout Success';
}

export class Login implements Action {
   readonly type = AUTHENTICATION_ACTIONS.LOGIN;
   constructor(public payload: User) { }
}

export class LoginSuccess implements Action {
   readonly type = AUTHENTICATION_ACTIONS.LOGIN_SUCCESS;
   constructor(public payload: { token: string, userData: any }) { }
}

export class LoginFailure implements Action {
   readonly type = AUTHENTICATION_ACTIONS.LOGIN_FAILURE;
   constructor(public payload: any) { }
}


export class Register implements Action {
   readonly type = AUTHENTICATION_ACTIONS.REGISTER;
   constructor(public payload: User) { }
}

export class RegisterSuccess implements Action {
   readonly type = AUTHENTICATION_ACTIONS.REGISTER_SUCCESS;
   constructor() { }
}

export class RegisterFailure implements Action {
   readonly type = AUTHENTICATION_ACTIONS.REGISTER_FAILURE;
   constructor(public payload: any) { }
}

export class Logout implements Action {
   readonly type = AUTHENTICATION_ACTIONS.LOGOUT;
   constructor() { }
}

export class LogoutSuccess implements Action {
   readonly type = AUTHENTICATION_ACTIONS.LOGOUT_SUCCESS;
   constructor() { }
}

export type AuthenticationActions = 
   Login |
   LoginSuccess |
   LoginFailure |
   Register |
   RegisterSuccess |
   RegisterFailure |
   Logout |
   LogoutSuccess