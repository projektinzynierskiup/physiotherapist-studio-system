import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';
import { JwtHelperService } from '@auth0/angular-jwt';



@NgModule({
  declarations: [],
  imports: [
    JwtHelperService 
  ],
  providers: [
    SharedService
  ]
})
export class SharedModule { }
