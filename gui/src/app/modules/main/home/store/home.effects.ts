import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { AuthenticationService } from "src/app/modules/authentication/services/authentication.service";
import { login, loginSuccess, loginFailure } from "src/app/modules/authentication/store/authentication.actions";
import { SharedService } from "src/app/modules/shared/services/shared.service";
import { HomeService } from "../services/home.service";
import { OfferItem } from "src/app/modules/shared/models/offeritem.model";
import { getMassage, getMassageFailure, getMassageSuccess, getOffer, getOfferFailure, getOfferSuccess, getStatuate, getStatuateFailure, getStatuateSuccess } from "./home.actions";


@Injectable()
export class HomeEffects {

   constructor(
      private actions: Actions,
      private homeService: HomeService
   ) { }

   getOffer$ = createEffect(() => this.actions.pipe(
      ofType(getOffer),
      switchMap(() => {
        return this.homeService.getOffer()
          .pipe(
            map((offer: any) => {
              return getOfferSuccess({ offer: offer });
            }),
            catchError((err) => {
              console.log(err);
              return of(getOfferFailure({ error: err.error }));
            })
          );
      })
   ));

   getMassager$ = createEffect(() => this.actions.pipe(
    ofType(getMassage),
    switchMap(() => {
      return this.homeService.getMassage()
        .pipe(
          map((massage: any) => {
            return getMassageSuccess({ massage: massage });
          }),
          catchError((err) => {
            console.log(err);
            return of(getMassageFailure({ error: err.error }));
          })
        );
    })
 ));

 getStatuate$ = createEffect(() => this.actions.pipe(
  ofType(getStatuate),
  switchMap(() => {
    return this.homeService.getStatuate()
      .pipe(
        map((statuate: any) => {
          return getStatuateSuccess({ statuate: statuate });
        }),
        catchError((err) => {
          console.log(err);
          return of(getStatuateFailure({ error: err.error }));
        })
      );
  })
));
}