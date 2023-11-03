import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MainState } from "./main.reducers";

// Create a feature selector for the authentication feature
export const selectHomeState = createFeatureSelector<MainState>('main');

// Create a selector to get the user from the authentication state
export const selectLastPageVisited = createSelector(
   selectHomeState,
  (state: MainState) => state?.lastPageVisited
);
