import * as authentication from '../modules/authentication/store/authentication.reducers';
import * as home from '../modules/main/home/store/home.reducers';
import * as main from '../modules/main/store/main.reducers';
import * as booking from '../modules/booking/store/booking.reducers';
import * as calendar from '../modules/calendar/store/calendar.reducers';


export interface AppState {
   authentication: authentication.AuthState;
   home: home.HomeState
   main: main.MainState
   booking: booking.BookingState
   calendar: calendar.CalendarState
}