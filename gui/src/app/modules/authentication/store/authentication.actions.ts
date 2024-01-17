import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/user.model';

export const login = createAction(
  '[Auth] Login Requested',
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; userData: any; }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any, email: string | undefined }>()
);

export const register = createAction(
  '[Auth] Register Requested',
  props<{ user: User }>()
);

export const registerSuccess = createAction('[Auth] Register Success');

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any, email: string | undefined }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const sendResetPasswordLink = createAction(
  '[Auth] Send Reset Password Link Requested',
  props<{ email: string }>()
);

export const sendResetPasswordLinkSuccess = createAction(
  '[Auth] Send Reset Password Link Success',
  props<{ info: string }>()
);

export const sendResetPasswordLinkFailure = createAction(
  '[Auth] Send Reset Password Link Failure',
  props<{ error: any, info: string }>()
);

export const setSendLinkExecuted = createAction(
  '[Auth] Set Send Link Executed',
  props<{ flag: boolean }>()
);
