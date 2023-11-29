import { createAction, props } from "@ngrx/store";
import { Appointment } from "../../shared/models/appointment.model";


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
 
export const bookAppointment = createAction(
   '[Booking] Book Appointment',
   props<{ appointment: Appointment }>()
)

export const bookAppointmentSuccess = createAction(
   '[Booking] Book Appointment Success',
   props<{ response: any }>()
)

export const bookAppointmentFailure = createAction(
   '[Booking] Book Appointment Failure',
   props<{ error: any }>()
)

export const resetBookingStatus = createAction(
   '[Booking] Reset Booking Status'
)