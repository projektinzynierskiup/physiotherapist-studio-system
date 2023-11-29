import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEntryComponent } from './components/calendar-entry/calendar-entry.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbTooltipModule, NbCheckboxModule } from '@nebular/theme';
import { CalendarService } from './components/services/calendar.service';



@NgModule({
  declarations: [
    CalendarEntryComponent,
    CalendarComponent,
    
  ],
  imports: [
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    NbInputModule,
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
  ]
})
export class CalendarModule { }
