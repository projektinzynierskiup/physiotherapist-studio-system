import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from './services/notification.service';
import { NbAlertModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbToastrModule, NbToastrService } from '@nebular/theme';
import { EmailService } from './services/email.service';
import { CancelNewsletterComponent } from './components/cancel-newsletter.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    CancelNewsletterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    FlexLayoutModule,
    MatIconModule,
    NbContextMenuModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    NbInputModule,
    NbIconModule,
    NbAlertModule
  ],
  providers: [
    JwtHelperService,
    SharedService,
    NotificationService,
    NbToastrService,
    EmailService
  ]
})
export class SharedModule { }
