import { Action, createReducer, on } from '@ngrx/store';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import * as HomeActions from '../store/home.actions'
import { Massage } from 'src/app/modules/shared/models/massage.model';
import { Statuate } from 'src/app/modules/shared/models/statuate.model';

export interface HomeState {
  offer: OfferItem[]
  massage: Massage[]
  statuate?: Statuate
}

export const initialState: HomeState = {
   offer: [],
   massage: [],
   statuate: undefined
};

const homeReducer = createReducer(
  initialState,
  on(HomeActions.getOfferSuccess, (state, { offer }) => ({
    ...state,
    offer: offer
  })),
  on(HomeActions.getMassageSuccess, (state, { massage }) => ({
    ...state,
    massage: massage
  })),
  on(HomeActions.getStatuateSuccess, (state, { statuate }) => ({
    ...state,
    statuate: statuate
  }))
)

export function reducer(state: HomeState | undefined, action: Action) {
  return homeReducer(state, action);
}
