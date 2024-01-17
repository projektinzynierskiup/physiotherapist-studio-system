import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { User } from '../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { selectUser } from '../../../authentication/store/authentication.selectors';
import { setLastPageVisited } from 'src/app/modules/main/store/main.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Appointment } from 'src/app/modules/shared/models/appointment.model';
import * as moment from 'moment';
import { NbDialogService } from '@nebular/theme';
import { NewsletterService } from 'src/app/modules/shared/services/newsletter.service';
import { CalendarService } from 'src/app/modules/calendar/services/calendar.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription

  user!: User;

  futureAppointments: Appointment[] = []
  finishedAppointments: Appointment[] = []
  
  userInfo: FormGroup;
  submitButtonClick: boolean = false
  inNewsletter: boolean = false

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private newsletterService: NewsletterService,
    private dialogService: NbDialogService,
    private accountService: AccountService,
    private calendarService: CalendarService
  ) {
    this.userInfo = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });
  }
  


  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser).subscribe(res => {
      if(res) {
        this.user = res
      }
    })
    this.checkIfInNewsetter()
    console.log(this.inNewsletter)
    this.userInfo = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      username: [this.user.username, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      phone: [this.user.phone, [Validators.required]],
    });
    this.userInfo.disable();

    if(this.user.role != 'MOD') {
      this.getFutureAppointments()
      this.getFinishedAppointments()
    }

    this.store.dispatch(setLastPageVisited({url: '/account'}))

  }

  openConfirmationDialog(dialog : TemplateRef<any>) {
    this.dialogService.open(dialog);
  }

  edit(): void {
    if (!this.isEditMode) {
      // Handle save logic when in edit mode
      console.log('Save logic here');
      // Optionally, you can disable the form after saving
      this.isEditMode = false;
    } else {
      this.submitButtonClick = true

      if(!this.userInfo.valid) return 

      const user: User = {
        id: this.user.id,
        email: this.userInfo.value.email,
        username: this.userInfo.value.username,
        surname: this.userInfo.value.surname,
        phone: this.userInfo.value.phone
      };

      this.accountService.editUserDetails(user).subscribe(res => {
        console.log(res)
      })
      // Handle regular form submission logic
      console.log('Regular form submission logic here');
    }
  }

  // edit() {
  //   console.log(this.userInfo)

  //   this.accountService.editUserDetails(this.userInfo.value).subscribe(res => {
  //     console.log(res)
  //   })
  // }

  checkIfInNewsetter() {
    this.newsletterService.isUserInNewsletter(this.user.email!).subscribe((res : any) => {
      if(res.info === "true") this.inNewsletter = true
      else this.inNewsletter = false
    })
  }

  signOutFromNewsletter() {
    this.newsletterService.signOutFromNewsletter(this.user.email!).subscribe((res : any) => {
      console.log(res)
      this.inNewsletter = false
    })
  }

  getFutureAppointments() {
    if(this.user.id) {
      this.accountService.getFutureAppointments(this.user.id).subscribe(res => {
        console.log(res)
        this.futureAppointments = res
      })
    }
  }

  getFinishedAppointments() {
    if(this.user.id) {
      this.accountService.getFiniskedAppointments(this.user.id).subscribe(res => {
        console.log(res)
        this.finishedAppointments = res
      })
    }
  }

  openCancelDialog(dialog: TemplateRef<any>, data : Appointment | undefined) {
    this.dialogService.open(dialog, {context: data});
  }

  deleteAppointment( data : Appointment | undefined) {
    if(data && data.id) {
      this.calendarService.deleteAppointment(data.id).subscribe(res => {
        console.log(res)
        this.getFutureAppointments()
      })
    }
  }

  formatDate(data: string | undefined): string {
    if (!data) {
      return ''; // Handle undefined input
    }
  
    return moment(data).locale('pl').format('H:mm, D MMMM YYYY');
  }

  getBackground() {
    return `../../../../assets/background3.jpg`
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'email':
        const emailControl = this.userInfo.get('email');
        if (emailControl?.value === '' && this.submitButtonClick) {
          tip += "Adres email wymagany"
        } else if(emailControl?.hasError('email')) {
          tip += "Adres email powinien posiadać @"
        }
        break;
      case 'username':
        const usernameControl = this.userInfo.get('username');
        
        if(usernameControl?.value === '' && this.submitButtonClick) {
          tip += "Imię wymagane"
        }
        break;
      case 'surname':
        const surnameControl = this.userInfo.get('surname');
        if(surnameControl?.value === '' && this.submitButtonClick) {
          tip += "Nazwisko wymagane"
        }
        break;
      case 'phone':
        const phoneControl = this.userInfo.get('phone');
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
    const control = this.userInfo.get(name);
    
    return this.submitButtonClick && control?.invalid;
  }

  isEditMode = false;

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.userInfo.enable();
    } else {
      this.userInfo.disable();
    }
  }



  ngOnDestroy(): void {
    if(this.userSubscription) this.userSubscription.unsubscribe()
  }
}
