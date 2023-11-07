import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { User } from 'src/app/modules/shared/models/user.model';
import { register } from '../../store/authentication.actions';
import { NewsletterService } from 'src/app/modules/shared/services/newsletter.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private newsletterService: NewsletterService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{1,}$/)]],
      confirmPassword: [''],
      username: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      newsletter: ['', []],
      // acceptPrivacy: [false]
    }, { validator: this.checkPasswords });
  }

  onSubmit(): void {
    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
      surname: this.registerForm.value.surname
    };
    console.log(user)
    console.log(this.registerForm)
    if(this.registerForm.value.newsletter){
      this.newsletterService.signToNewsletter(this.registerForm.value.email).subscribe();
    }
    this.store.dispatch(register({user: user}))
  }

  checkPasswords(group: FormGroup) {
    return (group.get('password')?.value === group.get('confirmPassword')?.value)? null :{ notSame: true };
  }
}
