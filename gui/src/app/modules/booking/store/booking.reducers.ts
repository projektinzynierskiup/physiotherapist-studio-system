import { Action, createReducer, on } from '@ngrx/store';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import * as BookingActions from '../store/booking.actions'
import { Appointment, AvailableAppointment } from '../../shared/models/appointment.model';

export interface BookingState {
  selectedItemType: OfferItem | undefined
  availableAppointments: AvailableAppointment[] | undefined
  editAppointment?: Appointment
}

export const initialState: BookingState = {
   selectedItemType: undefined,
   availableAppointments: [],
  editAppointment: undefined
};

const bookingReducer = createReducer(
  initialState,
  on(BookingActions.setSelectedVisitType, (state, { visitType }) => ({
    ...state,
    selectedItemType: visitType
  })),
  on(BookingActions.setEditAppointment, (state, { appointment }) => ({
    ...state,
    editAppointment: appointment
  })),
  on(BookingActions.getAvailableAppointmentsSuccess, (state, { appointments }) => ({
    ...state,
    availableAppointments: appointments
  }))
)

export function reducer(state: BookingState | undefined, action: Action) {
  return bookingReducer(state, action);
}
