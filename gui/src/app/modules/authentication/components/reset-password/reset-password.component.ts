import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionStatus } from 'src/app/modules/shared/models/actionstatus.model';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  // Declare a variable to store the parameter
  uuid?: string;

  resetPasswordForm: FormGroup

  resetPasswordView?: boolean
  cannotResetPasswordView?: boolean
  submitButtonClick: boolean = false

  resetPasswordStatus?: ActionStatus

  dialog: any

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private fb: FormBuilder, private dialogService: NbDialogService, private router: Router) {

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{1,}$/)]],
      confirmPassword: [''],
    }, { validator: this.checkPasswords });

  }

  ngOnInit(): void {
    // Subscribe to the route parameters to get the value
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']; // 'id' should match the parameter name in the route
      // Now, this.userId will have the value from the URL
      console.log(this.uuid)
    });

    this.authenticationService.checkUuid(this.uuid).subscribe(
      (res) => {
        this.resetPasswordView = true
        this.cannotResetPasswordView = false
      },
      (error) => {
        try {
          this.cannotResetPasswordView = true
          this.resetPasswordView = false

        } catch (err) {
          console.error("An unexpected error occurred during error handling:", err);
        }
      }
    )
  }

  onSubmit(dialog : TemplateRef<any>): void {
    this.dialog = dialog
    this.submitButtonClick = true
    this.openDialog(dialog, "xxxxxxxxx")

    if(!this.resetPasswordForm.valid) return 

    console.log(this.resetPasswordForm)

    const body = {
      uuid: this.uuid,
      password: this.resetPasswordForm.getRawValue().password
    }

    this.authenticationService.resetPassword(body).subscribe(
      (res: any) => {
        this.resetPasswordStatus = {
          success: true,
          failure: false
        }

        this.openDialog(dialog, res?.info)
      },
      (error) => {
        try {
          this.resetPasswordStatus = {
            success: false,
            failure: true
          }

          this.openDialog(dialog, error?.info)
        } catch (err) {
          console.error("An unexpected error occurred during error handling:", err);
        }
      }
    )
  }

  openDialog(dialog : TemplateRef<any>, info: string) {
    console.log(this.resetPasswordStatus)
    if(this.resetPasswordStatus?.success && !this.resetPasswordStatus.failure) {
      this.dialogService.open(dialog, { context: info });

    } else if(!this.resetPasswordStatus?.success && this.resetPasswordStatus?.failure) {
      this.dialogService.open(dialog, { context: info});

    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'password':
        const passwordControl = this.resetPasswordForm.get('password');
        if(passwordControl?.value === '' && this.submitButtonClick) {
          tip += "Hasło wymagane"
        } else 
        if (passwordControl?.hasError('pattern')) {
          tip = "Hasło musi mieć co najmniej 8 znaków, zawierać dużą i małą literę oraz znak specjalny.";
        }
        break;
      case 'confirmPassword':
        const confirmPasswordControl = this.resetPasswordForm.get('confirmPassword');
        if (this.resetPasswordForm.controls['password'].value === '' && this.submitButtonClick) {
          tip += "Ponowne wprowadzenie hasła wymagane"
        } else if (confirmPasswordControl?.value != '' && this.resetPasswordForm.controls['password'].value !== confirmPasswordControl?.value) {
          tip = "Hasła nie są takie same"
        }
        break;
    }
    return tip
  }

  checkPasswords(group: FormGroup) {
    return (group.get('password')?.value === group.get('confirmPassword')?.value)? null :{ notSame: true };
  }
}
