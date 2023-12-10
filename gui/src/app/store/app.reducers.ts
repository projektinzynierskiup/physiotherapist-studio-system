import * as authentication from '../modules/authentication/store/authentication.reducers';
import * as home from '../modules/main/home/store/home.reducers';
import * as main from '../modules/main/store/main.reducers';
import * as booking from '../modules/booking/store/booking.reducers';
import * as calendar from '../modules/calendar/store/calendar.reducers';

export const reducers = {
   authentication: authentication.reducer,
   home: home.reducer,
   main: main.reducer,
   booking: booking.reducer,
   calendar: calendar.reducer
   // Add other reducers for different slices of state here
 };