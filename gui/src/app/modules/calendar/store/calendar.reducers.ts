import { createReducer, on } from '@ngrx/store';
import { setWeeklyFreeSlots, setWeeklyFreeSlotsSuccess, setWeeklyFreeSlotsFailure, setCalendarUpdate } from './calendar.actions';

export interface CalendarState {
   calendarUpdate: boolean;
  // Other state properties...
}

export const initialState: CalendarState = {
   calendarUpdate: false,
  // Initialize other state properties as needed...
};

export const reducer = createReducer(
  initialState,
  on(setCalendarUpdate, (state, action) => {
    return { ...state, calendarUpdate: action.flag };
  }),
  on(setWeeklyFreeSlotsSuccess, setWeeklyFreeSlotsFailure, (state) => {
    return { ...state, calendarUpdate: true };
  }),
  // Handle other actions and state updates...
);