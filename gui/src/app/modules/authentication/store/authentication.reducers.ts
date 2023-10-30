import { User } from "../../shared/models/user.model";
import { AUTHENTICATION_ACTIONS, AuthenticationActions } from "./authentication.actions";

export interface AuthenticationState {
  isAuthenticated: boolean
  user: User| null
  loginEnd: boolean
}

export const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  user: null,
  loginEnd: true
}

export function AuthenticationReducer(state: AuthenticationState, action: AuthenticationActions){

   switch (action.type) {
      case AUTHENTICATION_ACTIONS.LOGIN: {
        return {
          ...state,
          loginEnd: false
        };
      }
      case AUTHENTICATION_ACTIONS.LOGIN_SUCCESS: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            email: action.payload.userData.email,
            username: action.payload.userData.username,
          },
          loginEnd: true,
  
        };
      }
      case AUTHENTICATION_ACTIONS.LOGIN_FAILURE: {
        return {
          ...state
        };
      }
      case AUTHENTICATION_ACTIONS.LOGOUT_SUCCESS: {
        return {
          ...state,
          isAuthenticated: false,
          user: null  
        };
      }
      default:
         return state;
   }

}