

 import { Action, createReducer, on } from '@ngrx/store';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import * as MainActions from '../store/main.actions'

export interface MainState {
  lastPageVisited: string | undefined
}

export const initialState: MainState = {
   lastPageVisited: undefined
};

const mainReducer = createReducer(
  initialState,
  on(MainActions.setLastPageVisited, (state, { url }) => ({
    ...state,
    lastPageVisited: url
  }))
)

export function reducer(state: MainState | undefined, action: Action) {
  return mainReducer(state, action);
}
