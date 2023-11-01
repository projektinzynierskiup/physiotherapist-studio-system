import { createAction, props } from "@ngrx/store";
import { OfferItem } from "src/app/modules/shared/models/offeritem.model";


export const getOffer = createAction('[Get] Get Offer');

export const getOfferSuccess = createAction(
   '[Auth] Get Offer Success',
   props<{ offer: OfferItem[] }>()
);

export const getOfferFailure = createAction(
   '[Auth] Get Offer Failure',
   props<{ error: any }>()
);
 