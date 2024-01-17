import { createAction, props } from "@ngrx/store";
import { Massage } from "src/app/modules/shared/models/massage.model";
import { OfferItem } from "src/app/modules/shared/models/offeritem.model";
import { Statuate } from "src/app/modules/shared/models/statuate.model";


export const getOffer = createAction('[Get] Get Offer');

export const getOfferSuccess = createAction(
   '[Auth] Get Offer Success',
   props<{ offer: OfferItem[] }>()
);

export const getOfferFailure = createAction(
   '[Auth] Get Offer Failure',
   props<{ error: any }>()
);
 
export const getMassage = createAction('[Get] Get Massage');

export const getMassageSuccess = createAction(
   '[Auth] Get Massage Success',
   props<{ massage: Massage[] }>()
);

export const getMassageFailure = createAction(
   '[Auth] Get Massage Failure',
   props<{ error: any }>()
);

export const getStatuate = createAction('[Get] Get Statuate');

export const getStatuateSuccess = createAction(
   '[Auth] Get Statuate Success',
   props<{ statuate: Statuate }>()
);

export const getStatuateFailure = createAction(
   '[Auth] Get Statuate Failure',
   props<{ error: any }>()
);