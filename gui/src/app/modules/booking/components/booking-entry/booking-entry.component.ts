import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { setLastPageVisited } from '../../../main/store/main.actions';
import { Subscription } from 'rxjs';
import { selectOffer } from 'src/app/modules/main/home/store/home.selectors';
import { OfferItem } from 'src/app/modules/shared/models/offeritem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectIsAuthenticated, selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { User } from 'src/app/modules/shared/models/user.model';
import { selectAvailableAppointments, selectSelectedItemType } from '../../store/booking.selectors';
import { Appointment, AvailableAppointment } from 'src/app/modules/shared/models/appointment.model';
import * as moment from 'moment';
import { getAvailableAppointments } from '../../store/booking.actions';
import { CalendarDay, CalendarWeek } from 'src/app/modules/shared/models/calendar.model';
import { CookieService } from 'ngx-cookie-service';
import { BookingService } from '../../services/booking.service';
import { ActionStatus } from 'src/app/modules/shared/models/actionstatus.model';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-entry',
  templateUrl: './booking-entry.component.html',
  styleUrls: ['./booking-entry.component.scss']
})
export class BookingEntryComponent implements OnInit, OnDestroy {
  offerSubscription?: Subscription
  selectedItemTypeSubscription?: Subscription
  isAuthenticatedSubscription?: Subscription
  userSubscription?: Subscription
  availableAppointmentsSubscription!: Subscription
  subscriptionBookingStatus? : Subscription

  url: string = '/assets/offer-background.png'
  currentWeek = 0
  submitButtonClick: boolean = false
  user!: User;
  selectedItemType?: OfferItem
  offer?: OfferItem[]
  appointmentForm: FormGroup

  isAuthenticated?: boolean 

  bookingStep: number = 1
  bookingStatus?: ActionStatus

  step:number = 0
  dialog: any

  availableAppointments?: AvailableAppointment[]
  availableAppointmentsCalendar : CalendarWeek[] = []
  groupedAppointments?: {
    key: string,
    appointments: any[]
  }[]

  constructor(
    private fb: FormBuilder, 
    private store: Store<AppState>,
    private router: Router, 
    private bookingService: BookingService,
    private dialogService: NbDialogService
  ) {
    this.appointmentForm = this.fb.group({
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setLastPageVisited({url: '/booking'}))
    this.store.dispatch(getAvailableAppointments())

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
        this.availableAppointmentsCalendar[0] = this.generateFirstWeek()
        console.log(this.availableAppointmentsCalendar)
      }
      
    })

    this.appointmentForm = this.fb.group({
      type: [this.selectedItemType?.id || '', [Validators.required]],
      date: ['', [Validators.required]],
      email: [this.isAuthenticated ? this.user?.email : '', [Validators.required, Validators.email]],
      phone: [this.isAuthenticated ? this.user?.phone : '', [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
    });
  }

  changeCurrentWeek(step : number) {
    this.currentWeek += step
      
    this.availableAppointmentsCalendar.push( this.generateNextWeek())
    
  }

  formatDate(day : string) {
    return "<b>" + moment(day).locale('pl').format('dddd') + "</b><br>" + moment(day).locale('pl').format('L')
  }

  getTime(date : string) {
    return moment(date).format("HH:mm")
  }

  openStep(step : number) {
    if(step >= this.bookingStep) {
      this.bookingStep += 1
    }
  }

  isExpanded(step: number) {
    return step <= this.bookingStep
  }

  getBackground() {
    return `../../../../assets/background3.jpg`
  }

  getUrl(id : number | undefined) {
    return `../../../../assets/${id}.jpg`
  }

  setFormItem(key: string, value: any) {
    this.appointmentForm?.patchValue({
      [key]: value
    });

    console.log(this.appointmentForm?.value)
  }

  isDateSelected(id : number | undefined) {
    return this.appointmentForm?.get('date')?.value.id === id  && this.appointmentForm?.get('date')?.value.id != ''
  }

  
  isDateNotSelected(id : number | undefined) {
    return this.appointmentForm?.get('date')?.value.id != id && this.appointmentForm?.get('date')?.value != ''
  }


  isTypeSelected(id: number | undefined): boolean {
    return this.appointmentForm?.get('type')?.value === id || this.appointmentForm?.get('type')?.value === id  || this.appointmentForm?.get('type')?.value === ''; 
  }

  
  onSubmit(dialog : TemplateRef<any>): void {
    this.submitButtonClick = true

    if(!this.appointmentForm?.valid) return 

    console.log(this.appointmentForm.value)

    const formValues = this.appointmentForm?.getRawValue()
    const bookingDto : Appointment = {
      id: formValues.date.id,
      startDate: formValues.date.startDate,
      endDate: formValues.date.endDate,
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

        this.openDialog(dialog)
      },
      (error) => {
        try {
          this.bookingStatus = {
            success: false,
            failure: true
          }

          this.openDialog(dialog)
        } catch (err) {
          console.error("An unexpected error occurred during error handling:", err);
        }
      }
    )
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'email':
        const emailControl = this.appointmentForm?.get('email');
        if (emailControl?.value === '' && this.submitButtonClick) {
          tip += "Adres email wymagany"
        } else if(emailControl?.hasError('email')) {
          tip += "Adres email powinien posiadać @"
        }
        break;
      case 'username':
        const usernameControl = this.appointmentForm?.get('username');
        
        if(usernameControl?.value === '' && this.submitButtonClick) {
          tip += "Imię wymagane"
        }
        break;
      case 'surname':
        const surnameControl = this.appointmentForm?.get('surname');
        if(surnameControl?.value === '' && this.submitButtonClick) {
          tip += "Nazwisko wymagane"
        }
        break;
      case 'phone':
        const phoneControl = this.appointmentForm?.get('phone');
        if(phoneControl?.value === '' && this.submitButtonClick) {
          tip += "Numer telefonu wymagany"
        } else 
        if (phoneControl?.hasError('pattern')) {
          tip = "Numer telefonu powinien posiadać 9 cyfr";
        } 
        break; 
    }
    return tip
  }

  hasError(name : string) {
    const control = this.appointmentForm?.get(name);
    
    return this.submitButtonClick && control?.invalid;
  }

  generateFirstWeek() : any | undefined {
    var week : any | undefined = undefined
    
    console.log(moment().startOf('isoweek' as moment.unitOfTime.StartOf).format("YYYY-MM-DD"))

    const startOfWeek = moment().startOf('isoweek' as moment.unitOfTime.StartOf)
    const endOfWeek = moment().endOf('isoweek' as moment.unitOfTime.StartOf)

    let currentDay = startOfWeek;

    week = {
      week: startOfWeek.format('YYYY-MM-DD') + " - " + endOfWeek.format('YYYY-MM-DD'),
      days: []
    }

    while (currentDay.isSameOrBefore(endOfWeek)) {
      week.days.push({
        day: currentDay.format('YYYY-MM-DD'),
        today: currentDay.isSame(moment(), 'day'),
        passed: currentDay.isBefore(moment(), 'day'),
        cells: []
      });
      currentDay.add(1, 'day');
    }

    console.log(week)

    week.days.map((day : any, idx : number) => {
      const available = this.availableAppointments?.find(appo => appo.localDate.split("T")[0] == day.day)

      if(available) {
        week.days[idx].cells = available.simpleAppointmentDTO
      }
    })
  
    return week
  }
 
  generateNextWeek() {
    var week : any | undefined = undefined
    
    console.log(moment().startOf('isoweek' as moment.unitOfTime.StartOf).format("YYYY-MM-DD"))

    const startOfWeek = moment().startOf('isoweek' as moment.unitOfTime.StartOf).add(this.currentWeek, 'weeks')
    const endOfWeek = moment().endOf('isoweek' as moment.unitOfTime.StartOf).add(this.currentWeek, 'weeks')

    let currentDay = startOfWeek;

    week = {
      week: startOfWeek.format('YYYY-MM-DD') + " - " + endOfWeek.format('YYYY-MM-DD'),
      days: []
    }

    while (currentDay.isSameOrBefore(endOfWeek)) {
      week.days.push({
        day: currentDay.format('YYYY-MM-DD'),
        today: currentDay.isSame(moment(), 'day'),
        passed: currentDay.isBefore(moment(), 'day'),
        cells: []
      });
      currentDay.add(1, 'day');
    }

    week.days.map((day : any, idx : number) => {
      const available = this.availableAppointments?.find(appo => appo.localDate.split("T")[0] == day.day)

      if(available) {
        week.days[idx].cells = available.simpleAppointmentDTO
      }
    })
  
    return week
  }

  openDialog(dialog : TemplateRef<any>) {
    console.log(this.bookingStatus)
    if(this.bookingStatus?.success && !this.bookingStatus.failure) {
      this.dialogService.open(dialog, { context: 'Pomyślnie umówiono wizytę' });

    } else if(!this.bookingStatus?.success && this.bookingStatus?.failure) {
      this.dialogService.open(dialog, { context: 'Błąd przy umawianiu wizyty' });

    }
  }

  goToHome() {
    this.router.navigateByUrl('/home');

    this.bookingStatus = {
      success: false,
      failure: false
    }
    // this.store.dispatch(resetBookingStatus())
  }

  bookAgain() {
    this.appointmentForm = this.fb.group({
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      email: [this.isAuthenticated  ? this.user?.email : this.appointmentForm?.getRawValue().email, [Validators.required, Validators.email]],
      phone: [this.appointmentForm?.value.phone, [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
    });

    this.bookingStatus = {
      success: false,
      failure: false
    }

    this.bookingStep = 1
    this.store.dispatch(getAvailableAppointments())

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
