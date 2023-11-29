import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { SharedService } from "../../shared/services/shared.service";
import { Router } from "@angular/router";
import { createAction } from '@ngrx/store';
import { BookingService } from "../services/booking.service";
import { bookAppointment, bookAppointmentFailure, bookAppointmentSuccess, getAvailableAppointments, getAvailableAppointmentsFailure, getAvailableAppointmentsSuccess } from "./booking.actions";

@Injectable()
export class BookingEffects {

   constructor(
      private actions: Actions,
      private bookingService: BookingService,
      private sharedService: SharedService,
      private router: Router,
   ) { }

   getAvailableAppointments$ = createEffect(() => this.actions.pipe(
      ofType(getAvailableAppointments),
      switchMap(action => {
         return this.bookingService.getAvailableAppointments()
            .pipe(
            map((appointments: any) => {
              return getAvailableAppointmentsSuccess({ appointments: appointments });
            }),
            catchError((err) => {
              console.log(err);
              return of(getAvailableAppointmentsFailure({error : err}));
            })
          );
      })
   ));

   bookAppointment$ = createEffect(() => this.actions.pipe(
      ofType(bookAppointment),
      switchMap(action => {
         return this.bookingService.bookAppointment(action.appointment)
            .pipe(
            map((response) => {
              return bookAppointmentSuccess({response: response});
            }),
            catchError((err) => {
              console.log(err);
              return of(bookAppointmentFailure({error : err}));
            })
          );
      })
   ));
}
