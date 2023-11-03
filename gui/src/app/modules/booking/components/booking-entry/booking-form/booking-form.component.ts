import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectOffer } from 'src/app/modules/main/home/store/home.selectors';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import { AppState } from 'src/app/store/app.states';
import { selectSelectedItemType } from '../../../store/booking.selectors';
import { selectIsAuthenticated, selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { User } from 'src/app/modules/shared/models/user.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit, OnDestroy {
  offerSubscription?: Subscription
  selectedItemTypeSubscription?: Subscription
  isAuthenticatedSubscription?: Subscription
  userSubscription!: Subscription


  user!: User;
  selectedItemType?: OfferItem
  offer?: OfferItem[]
  appointmentForm?: FormGroup

  isAuthenticated?: boolean  



  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.offerSubscription = this.store.select(selectOffer).subscribe(res => {
        if(res) {
          this.offer = res
        }
      })
      console.log(this.offer)
      this.selectedItemTypeSubscription = this.store.select(selectSelectedItemType).subscribe(res => {
        if(res) {
          this.selectedItemType = res
        }
      })

      this.isAuthenticatedSubscription = this.store.select(selectIsAuthenticated).subscribe(res => {
        this.isAuthenticated = res
      })

      this.userSubscription = this.store.select(selectUser).subscribe(res => {
        if(res) {
          this.user = res
        }
      })
 
      
      this.appointmentForm = this.fb.group({
        type: [this.selectedItemType?.massageName || '', [Validators.required]],
        date: ['', [Validators.required]],
        email: [this.isAuthenticated ? this.user?.email : '', [Validators.required, Validators.email]],
        // phoneNumber: ['', [Validators.required]],
        username: [this.isAuthenticated ? this.user?.username : '', [Validators.required]],
        surname: [this.isAuthenticated ? this.user?.username : '', [Validators.required]]
      });
      console.log(this.appointmentForm)
    }, 0)


  }

  isFormFilled() {
    return false
  }

  onSubmit(): void {

  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
    if(this.selectedItemTypeSubscription) this.selectedItemTypeSubscription.unsubscribe()
    if(this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe()
    if(this.userSubscription) this.userSubscription.unsubscribe()
  }
}
