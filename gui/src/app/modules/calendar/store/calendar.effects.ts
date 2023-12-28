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
    switchMap(action => {
       return this.calendarService.addFreeSlots(action.workDays)
          .pipe(
          map((appointments: any) => {
            return setWeeklyFreeSlotsSuccess();
          }),
          catchError((err) => {
            console.log(err);
            return of(setWeeklyFreeSlotsFailure({error : err}));
          })
        );
    })
 ));
}