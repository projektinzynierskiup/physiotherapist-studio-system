import * as authentication from '../modules/authentication/store/authentication.reducers';
import * as home from '../modules/main/home/store/home.reducers';
import * as main from '../modules/main/store/main.reducers';
import * as booking from '../modules/booking/store/booking.reducers';

export const reducers = {
   authentication: authentication.reducer,
   home: home.reducer,
   main: main.reducer,
   booking: booking.reducer
   // Add other reducers for different slices of state here
 };