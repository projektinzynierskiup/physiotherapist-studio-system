import * as authentication from '../modules/authentication/store/authentication.reducers';


export interface AppState {
   authentication: authentication.AuthState;
}