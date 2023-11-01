import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as AuthActions from '../store/authentication.actions'

export interface AuthState {
  isAuthenticated: boolean;
  user: User | undefined;
  token: string | undefined;
  error: any | undefined;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  token: undefined,
  error: undefined,
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
  }))
)

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
