import { createFeatureSelector, createSelector } from "@ngrx/store";
import { HomeState } from "./home.reducers";

// Create a feature selector for the authentication feature
export const selectHomeState = createFeatureSelector<HomeState>('home');

// Create a selector to get the user from the authentication state
export const selectOffer = createSelector(
   selectHomeState,
  (state: HomeState) => state?.offer
);
