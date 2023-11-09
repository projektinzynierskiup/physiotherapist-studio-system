import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './authentication.reducers'; // Import your state interface

// Create a feature selector for the authentication feature
export const selectAuthState = createFeatureSelector<AuthState>('authentication');

// Create a selector to get the user from the authentication state
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state?.user
);

export const selectIsAuthenticated = createSelector(
   selectAuthState,
   (state: AuthState) => state?.isAuthenticated
 );

 export const selectResetPasswordInfo = createSelector(
  selectAuthState,
  (state: AuthState) => state?.resetPasswordInfo
);

export const selectSendLinkExecuted= createSelector(
  selectAuthState,
  (state: AuthState) => state?.sendLinkExecuted
);