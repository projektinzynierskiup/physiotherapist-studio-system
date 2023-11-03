import { createAction, props } from "@ngrx/store";


export const setSelectedVisitType = createAction(
   '[Booking] Set Selected Visit Type',
   props<{ visitType: any }>()
);

export const getCalendar = createAction(
   '[Booking] Get Calendar'
)