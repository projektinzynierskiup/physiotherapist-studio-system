import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectOffer } from 'src/app/modules/main/home/store/home.selectors';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import { AppState } from 'src/app/store/app.states';
import { selectAvailableAppointments, selectSelectedItemType } from '../../store/booking.selectors';
import { selectIsAuthenticated, selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { User } from 'src/app/modules/shared/models/user.model';
import { Appointment } from 'src/app/modules/shared/models/appointment.model';
import { getAvailableAppointments } from '../../store/booking.actions';
import * as moment from 'moment';
import { NbDialogService } from '@nebular/theme';
import { ActionStatus } from 'src/app/modules/shared/models/actionstatus.model';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

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
  subscriptionBookingStatus? : Subscription

  bookingStatus?: ActionStatus

  user!: User;
  selectedItemType?: OfferItem
  offer?: OfferItem[]
  appointmentForm?: FormGroup

  isAuthenticated?: boolean  

  availableAppointments?: Appointment[]
  groupedAppointments?: {
    key: string,
    appointments: any[]
  }[]

  dialog: any

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>, 
    private dialogService: NbDialogService, 
    private router: Router, 
    private bookingService: BookingService
  ) { }

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
          if(this.availableAppointments) {
            this.groupAvailableAppointments()
          }
        }
        
      })
      
      this.initForm()
    
    }, 0)
  }

  initForm() {
    this.appointmentForm = this.fb.group({
      type: [this.selectedItemType?.id || '', [Validators.required]],
      date: ['', [Validators.required]],
      email: [this.isAuthenticated ? this.user?.email : '', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
    });
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
  }

  isFormFilled() {
    return this.appointmentForm ? Object.values(this.appointmentForm.controls).some((control: AbstractControl) => control.invalid) : false
  }
  
  onSubmit(dialog : TemplateRef<any>): void {
    this.dialog = dialog

    const formValues = this.appointmentForm?.getRawValue()
    const bookingDto : Appointment = {
      id: formValues.date,
      startDate: this.availableAppointments?.at(formValues.date)?.startDate,
      endDate: this.availableAppointments?.at(formValues.date)?.endDate,
      userId: this.isAuthenticated ? this.user.id : undefined,
      massageId: formValues.type,
      userEmail: this.isAuthenticated ? undefined : formValues.email,
      userPhone: this.isAuthenticated ? undefined : formValues.phone
    }

    // Create a new object with only defined properties
    const filteredBookingDto: Appointment = Object.fromEntries(
      Object.entries(bookingDto).filter(([_, value]) => value !== undefined)
    );
        
    this.bookingService.bookAppointment(filteredBookingDto).subscribe(
      (res) => {
        this.bookingStatus = {
          success: true,
          failure: false
        }

        this.openDialog(this.dialog)

        this.deleteFromAvailableAppointments(bookingDto.id)
      },
      (error) => {
        try {
          this.bookingStatus = {
            success: false,
            failure: true
          }

          this.openDialog(this.dialog)
        } catch (err) {
          console.error("An unexpected error occurred during error handling:", err);
        }
      }
    )
  }

  deleteFromAvailableAppointments(id? : number) {
    this.availableAppointments = this.availableAppointments?.filter(appointments => appointments.id != id)
    this.groupAvailableAppointments()
  }

  goToHome() {
    this.router.navigateByUrl('/home');

    this.bookingStatus = {
      success: false,
      failure: false
    }
    // this.store.dispatch(resetBookingStatus())
  }
  
  openDialog(dialog : TemplateRef<any>) {
    console.log(this.bookingStatus)
    if(this.bookingStatus?.success && !this.bookingStatus.failure) {
      this.dialogService.open(dialog, { context: 'Booking completed successfully' });

    } else if(!this.bookingStatus?.success && this.bookingStatus?.failure) {
      this.dialogService.open(dialog, { context: 'Booking failure' });

    }
  }

  bookAgain() {
    this.appointmentForm = this.fb.group({
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      email: [this.isAuthenticated  ? this.user?.email : this.appointmentForm?.getRawValue().email, [Validators.required, Validators.email]],
      phoneNumber: [this.appointmentForm?.getRawValue().phoneNumber, [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
    });

    this.bookingStatus = {
      success: false,
      failure: false
    }
    // this.store.dispatch(resetBookingStatus())
  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
    if(this.selectedItemTypeSubscription) this.selectedItemTypeSubscription.unsubscribe()
    if(this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe()
    if(this.userSubscription) this.userSubscription.unsubscribe()
    if(this.availableAppointmentsSubscription) this.availableAppointmentsSubscription.unsubscribe()
  }
}
