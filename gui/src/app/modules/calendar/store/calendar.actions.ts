import { createAction, props } from "@ngrx/store";
import { WorkDay } from "../../shared/models/workday.model";


export const setWeeklyFreeSlots = createAction(
   '[Calendar] Set Weekly Free Slots',
   props<{ workDays: WorkDay[] }>()
 );
 
export const setWeeklyFreeSlotsSuccess = createAction(
   '[Calendar] Set Weekly Free Slots Success'
);

export const setWeeklyFreeSlotsFailure = createAction(
   '[Calendar] Set Weekly Free Slots Failure',
   props<{ error: any }>()
);

export const setCalendarUpdate = createAction(
   '[Calendar] Set Calendar Update',
   props<{ flag: boolean }>()
)