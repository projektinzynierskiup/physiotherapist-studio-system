import { Action, createReducer, on } from '@ngrx/store';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import * as BookingActions from '../store/booking.actions'

export interface BookingState {
  selectedItemType: OfferItem | undefined
}

export const initialState: BookingState = {
   selectedItemType: undefined
};

const bookingReducer = createReducer(
  initialState,
  on(BookingActions.setSelectedVisitType, (state, { visitType }) => ({
    ...state,
    selectedItemType: visitType
  }))
)

export function reducer(state: BookingState | undefined, action: Action) {
  return bookingReducer(state, action);
}
