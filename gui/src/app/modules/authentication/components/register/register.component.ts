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
  submitButtonClick: boolean = false
  
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
      phone: ['', [Validators.required,  Validators.pattern("^[1-9]{3} [1-9]{3} [1-9]{3}$")]],
      newsletter: ['', []],
      // acceptPrivacy: [false]
    }, { validator: this.checkPasswords });
  }

  onSubmit(): void {
    this.submitButtonClick = true

    if(!this.registerForm.valid) return 

    const user: User = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      username: this.registerForm.value.username,
      surname: this.registerForm.value.surname,
      phone: this.registerForm.value.phone
    };

    if(this.registerForm.value.newsletter){
      this.newsletterService.signToNewsletter(this.registerForm.value.email).subscribe();
    }
    this.store.dispatch(register({user: user}))
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'email':
        const emailControl = this.registerForm.get('email');
        if (emailControl?.value === '' && this.submitButtonClick) {
          tip += "Adres email wymagany"
        } else if(emailControl?.hasError('email')) {
          tip += "Adres email powinien posiadać @"
        }
        break;
      case 'password':
        const passwordControl = this.registerForm.get('password');
        if(passwordControl?.value === '' && this.submitButtonClick) {
          tip += "Hasło wymagane"
        } else 
        if (passwordControl?.hasError('pattern') || passwordControl?.hasError('minlength')) {
          tip = "Hasło musi zawierać co najmniej 8 znaków, dużą i małą literę oraz znak specjalny.";
        }
        break;
      case 'confirmPassword':
        const confirmPasswordControl = this.registerForm.get('confirmPassword');
        if (this.registerForm.controls['password'].value === '' && this.submitButtonClick) {
          tip += "Ponowne wprowadzenie hasła wymagane"
        } else if (confirmPasswordControl?.value != '' && this.registerForm.controls['password'].value !== confirmPasswordControl?.value) {
          tip = "Hasła nie są takie same"
        }
        break;
      case 'username':
        const usernameControl = this.registerForm.get('username');
        
        if(usernameControl?.value === '' && this.submitButtonClick) {
          tip += "Imię wymagane"
        }
        break;
      case 'surname':
        const surnameControl = this.registerForm.get('surname');
        if(surnameControl?.value === '' && this.submitButtonClick) {
          tip += "Nazwisko wymagane"
        }
        break;
      case 'phone':
        const phoneControl = this.registerForm.get('phone');
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
    const control = this.registerForm.get(name);
    
    return this.submitButtonClick && control?.invalid;
  }

  checkPasswords(group: FormGroup) {
    return (group.get('password')?.value === group.get('confirmPassword')?.value)? null :{ notSame: true };
  }
}
