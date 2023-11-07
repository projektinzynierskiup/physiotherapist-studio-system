import { createAction, props } from "@ngrx/store";


export const setSelectedVisitType = createAction(
   '[Booking] Set Selected Visit Type',
   props<{ visitType: any }>()
);

export const getCalendar = createAction(
   '[Booking] Get Calendar'
)

export const getAvailableAppointments  = createAction(
   '[Booking] Get Available Appointments'
)

export const getAvailableAppointmentsSuccess  = createAction(
   '[Booking] Get Available Appointments Success',
   props<{ appointments: any }>()
)

export const getAvailableAppointmentsFailure = createAction(
   '[Booking] Get Available Appointments Failure',
   props<{ error: any }>()
);
 