import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/modules/shared/models/user.model';
import { AppState } from 'src/app/store/app.states';
import { AuthenticationService } from '../../services/authentication.service';
import { login } from '../../store/authentication.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const user: User = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    console.log(user)
    // this.store.dispatch(new FullStoreReset());
    this.store.dispatch(login({user: user}));
  }

  ngOnDestroy(): void {
    
  }
}
