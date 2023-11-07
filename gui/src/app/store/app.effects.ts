import * as authentication from '../modules/authentication/store/authentication.effects';
import * as booking from '../modules/booking/store/booking.effects';
import * as home from '../modules/main/home/store/home.effects'

export const Effects = [
   authentication.AuthenticationEffects,
   home.HomeEffects,
   booking.BookingEffects
]