import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as AuthActions from '../store/authentication.actions'

export interface AuthState {
  user: User | null;
  token: string | null;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, userData }) => ({
    ...state,
    token,
    user: userData,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null,
    error: null,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    token: null,
    error: null,
  }))
)

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
