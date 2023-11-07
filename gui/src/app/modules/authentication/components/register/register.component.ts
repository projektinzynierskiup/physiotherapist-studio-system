import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { User } from 'src/app/modules/shared/models/user.model';
import { register } from '../../store/authentication.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  patternPassword: any;
  regexPassword: any;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {

    this.patternPassword = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{1,}$/"
    this.regexPassword = new RegExp(this.patternPassword);

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{1,}$/)]],
      confirmPassword: [''],
      username: ['', [Validators.required]],
      surname: ['', [Validators.required]]
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
    this.store.dispatch(register({user: user}))
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'email':
        const emailControl = this.registerForm.get('email');
        if (emailControl?.value === '') {
          tip += "Email required"
        } else if(emailControl?.hasError('email')) {
          tip += "Invalid email patternn"
        }
        else if(emailControl?.value !== '') {
          tip += "Email valid"
        }
        break;
      case 'password':
        const passwordControl = this.registerForm.get('password');
        if(passwordControl?.value === '') {
          tip += "Password required"
        } else 
        if (passwordControl?.hasError('pattern')) {
          tip = "The password must be at least 8 characters long, contain upper and lower letter and sepcial character.";
        } else if(passwordControl?.value !== '') {
          tip = 'Password is valid.';
        }   
        break;
      case 'confirmPassword':
        const confirmPasswordControl = this.registerForm.get('confirmPassword');
        if (this.registerForm.controls['password'].value === this.registerForm.controls['confirmPassword'].value) {
          tip += "Passwords match"
        } else if (this.registerForm.controls['password'].value === '') {
          tip += "Insert password first"
        }
        else if (this.registerForm.controls['password'].value !== confirmPasswordControl?.value) {
          tip = "Password does not match"
        }
        break;
      case 'username':
        const usernameControl = this.registerForm.get('username');
        
        if(usernameControl?.value === '') {
          tip += "Username required"
        } else {
          tip += "Username valid"
        } 
        break;
      case 'surname':
        const surnameControl = this.registerForm.get('surname');
        if(surnameControl?.value === '') {
          tip += "Surname required"
        } else {
          tip += "Surname valid"
        } 
        break;
    }
    return tip
  }

  checkPasswords(group: FormGroup) {
    return (group.get('password')?.value === group.get('confirmPassword')?.value)? null :{ notSame: true };
  }
}
