import { createAction, props } from "@ngrx/store";


export const setLastPageVisited = createAction(
   '[Main] Set Last Page Visited',
   props<{ url: string }>()
 );