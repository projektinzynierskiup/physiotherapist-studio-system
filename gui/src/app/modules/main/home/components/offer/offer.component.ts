import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OfferItem, OfferPhoto } from 'src/app/modules/shared/models/offeritem.model';
import { AppState } from 'src/app/store/app.states';
import { selectMassage, selectOffer } from '../../store/home.selectors';
import { setSelectedVisitType } from 'src/app/modules/booking/store/booking.actions';
import { Router } from '@angular/router';
import { getMassage, getOffer } from '../../store/home.actions';
import { DomSanitizer } from '@angular/platform-browser';
import { AdministrationService } from 'src/app/modules/administration/services/administration.service';
import { Massage } from 'src/app/modules/shared/models/massage.model';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {

  offerSubscription?: Subscription
  massageSubscription?: Subscription

  modRole: boolean = false

  offer?: OfferItem[]
  offerPhotoList!: OfferPhoto[]
  massageList?: Massage[]

  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private administrationService: AdministrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modRole = localStorage.getItem('role') == 'MOD'
    this.getAllOfferPhoto()
    this.store.dispatch(getMassage())
    this.store.dispatch(getOffer())

    this.massageSubscription = this.store.select(selectMassage).subscribe(res => {
      console.log(res)
      if(res != undefined) {
        this.massageList = res
      } 
    })

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

  getUrl(id : number | undefined) {
    return `../../../../../../assets/${id}.jpg`
  }

  goToAdministration() {
    this.router.navigate(['/administration'])

  }

  getOfferPhotoByOfferId(id : number | undefined) {
    if(!this.offerPhotoList) return
    const photoBytes = this.offerPhotoList.find(element => element.offerId == id)?.photoByte

    if(!photoBytes) return undefined
    
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + photoBytes);
  }

  getAllOfferPhoto() {
    this.administrationService.getAllOfferPhoto().subscribe((res : OfferPhoto[]) => {
      console.log(res)
      this.offerPhotoList = res
    })
  }

  getDescription(id?: string) {
    console.log(id)
    console.log(this.massageList)
    return this.massageList?.find(massage => massage.id == id)?.description
  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
    if(this.massageSubscription) this.massageSubscription.unsubscribe()
  }
}
