import { Action, createReducer, on } from '@ngrx/store';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import * as HomeActions from '../store/home.actions'

export interface HomeState {
  offer: OfferItem[]
}

export const initialState: HomeState = {
   offer: []
};

const homeReducer = createReducer(
  initialState,
  on(HomeActions.getOfferSuccess, (state, { offer }) => ({
    ...state,
    offer: offer
  }))
)

export function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}
