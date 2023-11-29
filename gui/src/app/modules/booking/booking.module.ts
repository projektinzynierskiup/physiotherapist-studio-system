import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingEntryComponent } from './components/booking-entry/booking-entry.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbLayoutModule, NbOptionModule, NbSelectModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PhoneMaskDirective } from './directives/phone-mask.directive';



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
    NbCardModule
  ],
  exports: [
    PhoneMaskDirective
  ]
})
export class BookingModule { }
