import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingService } from "../../booking/services/booking.service";
import { setWeeklyFreeSlots, setWeeklyFreeSlotsFailure, setWeeklyFreeSlotsSuccess } from "./calendar.actions";
import { Injectable } from "@angular/core";
import { CalendarService } from "../services/calendar.service";
import { catchError, exhaustMap, forkJoin, map, of, switchMap } from "rxjs";


@Injectable()
export class CalendarEffects {

   constructor(
      private actions: Actions,
      private calendarService: CalendarService
   ) { }

   setWeeklyFreeSlots$ = createEffect(() => this.actions.pipe(
      ofType(setWeeklyFreeSlots),
      exhaustMap(action => {
        const payload = action;

        // Assuming `workHours` is an array of WorkHours
        const { workDays } = payload;

        // Use forkJoin to send requests for each element in the array
        const requests$ = workDays.map((workDay) => {
          const startDate = workDay.startDate// calculate start date based on workHour;
          const endDate = workDay.endDate// calculate end date based on workHour;

          // Assuming addFreeSlot takes startDate and endDate as parameters
          return this.calendarService.addFreeSlot(startDate, endDate);
        });

        // Use forkJoin to wait for all requests to complete
        return forkJoin(requests$).pipe(
          map((responses) => {
            // Handle responses if needed
            console.log(responses);
            // Dispatch the success action
            return setWeeklyFreeSlotsSuccess();
          }),
          catchError(error => {
            // Handle errors if needed
            console.error(error);
            // Dispatch the failure action
            return of(setWeeklyFreeSlotsFailure({ error: 'Your error message or details here' }));
          })
        );
      })
   ));
}