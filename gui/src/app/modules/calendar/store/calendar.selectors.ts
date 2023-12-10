import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarState } from './calendar.reducers';

// Create a feature selector for the authentication feature
export const selectCalendarState = createFeatureSelector<CalendarState>('calendar');

// Create a selector to get the user from the authentication state
export const selectCalendarUpdate = createSelector(
  selectCalendarState,
  (state: CalendarState) => state?.calendarUpdate
);
