import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { setLastPageVisited } from '../../main/store/main.actions';
import { Subscription } from 'rxjs';
import { selectOffer } from '../../main/home/store/home.selectors';
import { OfferItem } from '../../shared/models/offeritem.model';

@Component({
  selector: 'app-administration-entry',
  templateUrl: './administration-entry.component.html',
  styleUrls: ['./administration-entry.component.scss']
})
export class AdministrationEntryComponent implements OnInit, OnDestroy {
  offerSubscription?: Subscription
  offer?: OfferItem[]

  showItems = false;
  showPriceList = false
  showSidebar = true;

  switchCase? : 'offer' | 'priceList' = 'offer'

  menuItems : any[] = [
    {
      title: "Zarządzanie ofertą",
      icon: "dns",
      key: "offer"
    }, {
      title: "Zarządzanie cennikiem",
      icon: "attach_money",
      key: "priceList"
    },
  ]

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(setLastPageVisited({url: '/administration'}))

    this.offerSubscription = this.store.select(selectOffer).subscribe(res => {
      console.log(res)
      if(res.length) {
        this.offer = res
      } 
    })
  }

  selectMenuItem(key: 'offer' | 'priceList') {
    this.switchCase = key
  }

  toggleItemsVisibility(): void {
    this.showItems = !this.showItems;
  }
  
  togglePriceListVisibility(): void {
    this.showPriceList = !this.showPriceList;
  }

  toggleSidebarVisibility(): void {
    this.showSidebar = !this.showSidebar;
  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
  }
}
