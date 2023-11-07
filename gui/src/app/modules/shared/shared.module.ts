import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from './services/notification.service';
import { NbToastrModule, NbToastrService } from '@nebular/theme';



@NgModule({
  declarations: [],
  imports: [
    JwtHelperService,

  ],
  providers: [
    SharedService,
    NotificationService,
    NbToastrService
  ]
})
export class SharedModule { }
