import * as authentication from '../modules/authentication/store/authentication.reducers';
import * as home from '../modules/main/home/store/home.reducers';

export const reducers = {
   authentication: authentication.reducer,
   home: home.reducer
   // Add other reducers for different slices of state here
 };