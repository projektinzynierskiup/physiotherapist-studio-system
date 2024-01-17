import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { setLastPageVisited } from '../../../main/store/main.actions';
import { Subscription } from 'rxjs';
import { selectOffer } from 'src/app/modules/main/home/store/home.selectors';
import { OfferItem, OfferPhoto } from 'src/app/modules/shared/models/offeritem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectIsAuthenticated, selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { User } from 'src/app/modules/shared/models/user.model';
import { selectAvailableAppointments, selectEditAppointment, selectSelectedItemType } from '../../store/booking.selectors';
import { Appointment, AvailableAppointment } from 'src/app/modules/shared/models/appointment.model';
import * as moment from 'moment';
import { getAvailableAppointments, setEditAppointment, setSelectedVisitType } from '../../store/booking.actions';
import { CalendarDay, CalendarWeek } from 'src/app/modules/shared/models/calendar.model';
import { CookieService } from 'ngx-cookie-service';
import { BookingService } from '../../services/booking.service';
import { ActionStatus } from 'src/app/modules/shared/models/actionstatus.model';
import { NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AdministrationService } from 'src/app/modules/administration/services/administration.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Email } from 'src/app/modules/shared/models/email.model';
import { EmailService } from 'src/app/modules/shared/services/email.service';
import { CalendarService } from 'src/app/modules/calendar/services/calendar.service';

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
  editAppointmentSubscription? : Subscription

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

  offerPhotoList!: OfferPhoto[]

  editApointment!: Appointment;

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
    private sanitizer: DomSanitizer,
    private administrationService: AdministrationService,
    private bookingService: BookingService,
    private emailService: EmailService,
    private dialogService: NbDialogService,
    private calendarService: CalendarService
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
    this.getAllOfferPhoto()

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

    this.editAppointmentSubscription = this.store.select(selectEditAppointment).subscribe(res => {
      if(res) {
        this.editApointment = res
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

    if(this.editApointment) {
      console.log(this.editApointment)
      this.appointmentForm = this.fb.group({
        type: [this.editApointment.massageId || '', [Validators.required]],
        date: ['', [Validators.required]],
        email: [this.editApointment.usersDTO.email, [Validators.required, Validators.email]],
        phone: [this.editApointment.usersDTO.phone, [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
      });

      this.bookingStep = 3
    } else {

      this.appointmentForm = this.fb.group({
        type: [this.selectedItemType?.massageId || '', [Validators.required]],
        date: ['', [Validators.required]],
        email: [this.isAuthenticated ? this.user?.email : '', [Validators.required, Validators.email]],
        phone: [this.isAuthenticated ? this.user?.phone : '', [Validators.required, Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]]
      });
      
      if(this.selectedItemType) {
        this.openStep(2)
        this.store.dispatch(setSelectedVisitType({visitType: undefined}))
        
      }
    }
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
    if(step != this.bookingStep) {
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


  isTypeSelected(id: string | undefined): boolean {
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

        if(this.editApointment && this.editApointment.id) {
          this.sendChangeConfirmation(filteredBookingDto)
          this.calendarService.deleteAppointment(this.editApointment.id).subscribe(res => {
            console.log(res)
            this.calendarService.addFreeSlot(this.editApointment.startDate, this.editApointment.endDate).subscribe(res => {
              console.log(res)
            })
          })
          this.store.dispatch(setEditAppointment({appointment : undefined}))
        } else {
          this.sendConfirmation(bookingDto)
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

  sendConfirmation(appointment : Appointment) {
    const email : Email = {
      visitId: appointment.id,
      recipientEmail: this.appointmentForm?.getRawValue().email,
      startTime: appointment.startDate + ".000Z",
      endTime: appointment.endDate + ".000Z",
      username: this.isAuthenticated ? this.user.username : this.appointmentForm?.getRawValue().email,
      eventName: this.offer?.find(off => off.massageId == this.appointmentForm?.getRawValue().type)?.name,
      description: "Pomyślnie umówiono wizytę",
      emailStatus: "ACCEPTATION"
    }

    this.emailService.sendEmail(email).subscribe(res => {
      console.log(res)
    })
  }

  sendChangeConfirmation(filteredBookingDto : Appointment) {
    const email : Email = {
      visitId: this.editApointment.id,
      recipientEmail: this.appointmentForm?.getRawValue().email,
      startTime: filteredBookingDto.startDate + ".000Z",
      endTime: filteredBookingDto.endDate + ".000Z",
      username: this.isAuthenticated ? this.user.username : this.appointmentForm?.getRawValue().email,
      eventName: this.offer?.find(off => off.massageId == this.appointmentForm?.getRawValue().type)?.name,
      description: "Wizyta została edytowana",
      emailStatus: "CHANGE"
    }

    this.emailService.sendEmail(email).subscribe(res => {
      console.log(res)
    })
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

  
  getAllOfferPhoto() {
    this.administrationService.getAllOfferPhoto().subscribe((res : OfferPhoto[]) => {
      console.log(res)
      this.offerPhotoList = res
    })
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
    
    if(this.editApointment && this.bookingStatus?.success && !this.bookingStatus.failure) {
      this.dialogService.open(dialog, { context: 'Pomyślnie edytowano wizytę' });
    } else if(this.editApointment && !this.bookingStatus?.success && this.bookingStatus?.failure) {
      this.dialogService.open(dialog, { context: 'Błąd przy edytowaniu wizyty' });
    } else if(this.bookingStatus?.success && !this.bookingStatus.failure) {
      this.dialogService.open(dialog, { context: 'Pomyślnie umówiono wizytę' });
    } else if(!this.bookingStatus?.success && this.bookingStatus?.failure) {
      this.dialogService.open(dialog, { context: 'Błąd przy umawianiu wizyty' });
    }
  }
  getOfferPhotoByOfferId(id : number | undefined) {
    if(!this.offerPhotoList) return
    const photoBytes = this.offerPhotoList.find(element => element.offerId == id)?.photoByte

    if(!photoBytes) return undefined
    
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + photoBytes);
  }

  goToHome() {
    this.router.navigateByUrl('/home');

    this.bookingStatus = {
      success: false,
      failure: false
    }
    // this.store.dispatch(resetBookingStatus())
  }

  goToCalendar() {
    this.router.navigateByUrl('/calendar');

    this.bookingStatus = {
      success: false,
      failure: false
    }
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
    if(this.editAppointmentSubscription) this.editAppointmentSubscription.unsubscribe()
  }
}
