import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import { AppState } from 'src/app/store/app.states';
import { selectOffer } from '../../store/home.selectors';
import { setSelectedVisitType } from 'src/app/modules/booking/store/booking.actions';
import { Router } from '@angular/router';
import { getOffer } from '../../store/home.actions';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {

  offerSubscription?: Subscription

  modRole: boolean = false

  offer?: OfferItem[]

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modRole = localStorage.getItem('role') == 'MOD'

    this.offerSubscription = this.store.select(selectOffer).subscribe(res => {
      console.log(res)
      if(res.length) {
        this.offer = res
      } 
    })

  }

  onOfferItemClick(offerItem: OfferItem) {
    this.store.dispatch(setSelectedVisitType({visitType: offerItem}))

    this.router.navigate(['/booking'])
  }

  goToAdministration() {
    this.router.navigate(['/administration'])

  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
  }
}
