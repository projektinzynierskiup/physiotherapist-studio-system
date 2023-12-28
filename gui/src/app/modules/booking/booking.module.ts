import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingEntryComponent } from './components/booking-entry/booking-entry.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhoneMaskDirective } from './directives/phone-mask.directive';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [
    BookingEntryComponent,
    BookingFormComponent,
    PhoneMaskDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    NbInputModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbOptionModule,
    NbCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    NbCheckboxModule
  ],
  exports: [
    PhoneMaskDirective
  ],
  providers: [
    CookieService 
  ]
})
export class BookingModule { }
