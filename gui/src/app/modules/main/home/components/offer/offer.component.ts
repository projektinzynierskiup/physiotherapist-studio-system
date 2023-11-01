import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import { AppState } from 'src/app/store/app.states';
import { selectOffer } from '../../store/home.selectors';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {

  offerSubscription?: Subscription

  offer?: OfferItem[]

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    
    this.offerSubscription = this.store.select(selectOffer).subscribe(res => {
      if(res) {
        this.offer = res
      }
    })

    console.log(this.offer)
  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
  }
}
