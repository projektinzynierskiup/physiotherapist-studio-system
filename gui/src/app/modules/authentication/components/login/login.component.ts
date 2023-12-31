import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/modules/shared/models/user.model';
import { AppState } from 'src/app/store/app.states';
import { AuthenticationService } from '../../services/authentication.service';
import { login, sendResetPasswordLink, setSendLinkExecuted } from '../../store/authentication.actions';
import { NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { selectErrorFlag, selectResetPasswordInfo, selectSendLinkExecuted } from '../../store/authentication.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  resetPasswordInfoSubscription?: Subscription
  sendLinkExecutedSubscription?: Subscription
  loginErrorSubscription?: Subscription

  loginForm: FormGroup;
  resetPasswordForm: FormGroup;
  resetPasswordInfo?: string
  sendLinkExecuted?: boolean = false
  
  emailRequiredInfo: string = ''
  passwordRequiredInfo: string = ''
  authenticationErrorInfo: string = ''

  constructor(private fb: FormBuilder, private store: Store<AppState>, private dialogService: NbDialogService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.resetPasswordForm = this.fb.group({})
  }

  ngOnInit(): void {
    
    this.resetPasswordInfoSubscription = this.store.select(selectResetPasswordInfo).subscribe(res => {
      if(res) {
        this.resetPasswordInfo = res
      }
    })
    this.sendLinkExecutedSubscription = this.store.select(selectSendLinkExecuted).subscribe(res => {
      if(res != undefined) {
        this.sendLinkExecuted = res
      }
    })

    this.loginErrorSubscription = this.store.select(selectErrorFlag).subscribe(res => {
      if(res) {
        this.authenticationErrorInfo = 'Wprowadzono nieprawidłowy email bądź hasło!'
      }
    })
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'email':
        const emailControl = this.resetPasswordForm.get('email');
        if(emailControl?.hasError('email')) {
          tip += "Adres email powinien posiadać @"
        }
        break;
      }
      return tip
   }
  

  onSubmit(): void {
    this.emailRequiredInfo = ''
    this.passwordRequiredInfo = ''
    this.authenticationErrorInfo = ''
    if(this.loginForm.value.email === '' || this.loginForm.value.password === '' || this.loginForm.get('email')?.hasError('email')) {
      console.log(this.loginForm.value)
      if(this.loginForm.value.email == '') {
        this.emailRequiredInfo = "Adres email wymagany"
      } else if(this.loginForm.get('email')?.hasError('email')) {
        this.emailRequiredInfo = "Nieprawidłowy format adresu email"
      }
      if(this.loginForm.value.password == '') {
        this.passwordRequiredInfo = "Hasło wymagane"
      }

      return
    }
    
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    console.log(user)
    // this.store.dispatch(new FullStoreReset());
    this.store.dispatch(login({user: user}));
  }

  onResetPasswordSubmit(): void {
    const email = this.resetPasswordForm.value.email

    this.store.dispatch(sendResetPasswordLink({email: email}))
    console.log(email)
  }

  openDialog(dialog: TemplateRef<any>) {
    this.store.dispatch(setSendLinkExecuted({flag: false}))
    this.resetPasswordForm = this.fb.group({
      email: [this.loginForm.value.email, [Validators.required, Validators.email]],
    });

    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  openDialogAgain() {
    this.store.dispatch(setSendLinkExecuted({flag: false}))
  }
  
  ngOnDestroy(): void {
    if(this.resetPasswordInfoSubscription) this.resetPasswordInfoSubscription.unsubscribe()
    if(this.sendLinkExecutedSubscription) this.sendLinkExecutedSubscription.unsubscribe()
    if(this.loginErrorSubscription) this.loginErrorSubscription.unsubscribe()
  }
}
