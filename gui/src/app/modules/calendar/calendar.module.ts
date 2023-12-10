import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEntryComponent } from './components/calendar-entry/calendar-entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbTooltipModule, NbCheckboxModule, NbTimepickerModule } from '@nebular/theme';
import { CalendarService } from './services/calendar.service';
import { MatIconModule } from '@angular/material/icon';
import { TimeInputDirective } from './directives/time-input.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { MinutesPickerComponent } from './components/minutes-picker/minutes-picker.component';



@NgModule({
  declarations: [
    CalendarEntryComponent,
    CalendarComponent,
    TimeInputDirective,
    TimePickerComponent,
    MinutesPickerComponent
  ],
  imports: [
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    NbInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTooltipModule,
    FlexLayoutModule,
    NbButtonModule,
    NbCheckboxModule,
    CommonModule
  ],
  providers: [
    CalendarService
  ],
  exports: [
    TimeInputDirective
  ]
})
export class CalendarModule { }
