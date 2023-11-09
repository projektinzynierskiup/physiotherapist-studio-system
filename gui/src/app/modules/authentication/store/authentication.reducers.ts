import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as AuthActions from '../store/authentication.actions'

export interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string | undefined;
  error: any | undefined;
  resetPasswordInfo: string;
  sendLinkExecuted: boolean
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  token: undefined,
  error: undefined,
  resetPasswordInfo: '',
  sendLinkExecuted: false
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, userData }) => ({
    ...state,
    isAuthenticated: true,
    token,
    user: userData,
    error: undefined,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    error: undefined,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: undefined,
    token: undefined,
    error: undefined,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    user: undefined,
    token: undefined,
    error: undefined,
  })),
  on(AuthActions.sendResetPasswordLink, (state, {  }) => ({
    ...state,
    sendLinkExecuted: false
  })),
  on(AuthActions.sendResetPasswordLinkSuccess, AuthActions.sendResetPasswordLinkFailure, (state, { info }) => ({
    ...state,
    resetPasswordInfo: info,
    sendLinkExecuted: true
  })),
  on(AuthActions.setSendLinkExecuted, (state, { flag }) => ({
    ...state,
    sendLinkExecuted: flag
  }))
)

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
