import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingState } from "./booking.reducers";

// Create a feature selector for the authentication feature
export const selectBookingState = createFeatureSelector<BookingState>('booking');

// Create a selector to get the user from the authentication state
export const selectSelectedItemType = createSelector(
   selectBookingState,
  (state: BookingState) => state?.selectedItemType
);

export const selectAvailableAppointments = createSelector(
  selectBookingState,
 (state: BookingState) => state?.availableAppointments
);

export const selectEditAppointment = createSelector(
  selectBookingState,
 (state: BookingState) => state?.editAppointment
);