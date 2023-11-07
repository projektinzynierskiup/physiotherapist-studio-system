import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectOffer } from 'src/app/modules/main/home/store/home.selectors';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import { AppState } from 'src/app/store/app.states';
import { selectAvailableAppointments, selectSelectedItemType } from '../../../store/booking.selectors';
import { selectIsAuthenticated, selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { User } from 'src/app/modules/shared/models/user.model';
import { Appointment } from 'src/app/modules/shared/models/appointment.model';
import { getAvailableAppointments } from '../../../store/booking.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit, OnDestroy {
  offerSubscription?: Subscription
  selectedItemTypeSubscription?: Subscription
  isAuthenticatedSubscription?: Subscription
  userSubscription?: Subscription
  availableAppointmentsSubscription!: Subscription


  user!: User;
  selectedItemType?: OfferItem
  offer?: OfferItem[]
  appointmentForm?: FormGroup

  isAuthenticated?: boolean  

  availableAppointments?: Appointment[]
  groupedAppointments?: {
    key: string,
    appointments: Appointment[]
  }[]



  constructor(private fb: FormBuilder, private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(getAvailableAppointments())

    setTimeout(() => {
      this.offerSubscription = this.store.select(selectOffer).subscribe(res => {
        if(res) {
          this.offer = res
        }
      })
      
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

      this.availableAppointmentsSubscription = this.store.select(selectAvailableAppointments).subscribe(res => {
        if(res) {
          this.availableAppointments = res
          if(this.availableAppointments) {
            this.groupAvailableAppointments()
          }
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

  groupAvailableAppointments() {
    if(this.availableAppointments) {
      this.groupedAppointments = [{
        key: moment(this.availableAppointments?.at(0)?.startDate).format('YYYY-MM-DD'),
        appointments: []
      }]

      var index = 0
      
      
      this.availableAppointments?.map(appointment => {
        if(this.groupedAppointments) {
          if(moment(appointment?.startDate).format('YYYY-MM-DD') == this.groupedAppointments[index].key) {
            this.groupedAppointments[index].appointments = [...this.groupedAppointments[index].appointments, appointment]
          } else {
            this.groupedAppointments[++index] = {
              key: moment(appointment?.startDate).format('YYYY-MM-DD'),
              appointments: [appointment]
            }
          }
        }
      })
    }
  }
  getTime(date: string) {
    return moment(date).format("HH:mm")
  }

  getDuration(startDate: string, endDate: string) {
    const startDateMoment = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    const endDateMoment = moment(endDate, 'YYYY-MM-DD HH:mm:ss');

    const durationInMilliseconds = moment.duration(endDateMoment.diff(startDateMoment)).as('milliseconds')

    const hours = Math.floor(moment.duration(durationInMilliseconds).asHours());
    const minutes = moment.duration(durationInMilliseconds).minutes();
    if(minutes != 0) {
      return `${hours}h ${minutes}m`
    } else {
      return `${hours}h`
      
    }
//  return moment.utc(moment.duration(endDateMoment.diff(startDateMoment)).as('milliseconds')).format('HHhmmm').replace(/^0/, '');
  }

  isFormFilled() {
    return false
  }
  
  onSubmit(): void {
    console.log(this.appointmentForm?.getRawValue())
  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
    if(this.selectedItemTypeSubscription) this.selectedItemTypeSubscription.unsubscribe()
    if(this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe()
    if(this.userSubscription) this.userSubscription.unsubscribe()
    if(this.availableAppointmentsSubscription) this.availableAppointmentsSubscription.unsubscribe()
  }
}
