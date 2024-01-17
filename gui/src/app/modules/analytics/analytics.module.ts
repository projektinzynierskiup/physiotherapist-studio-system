import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsEntryComponent } from './analytics-entry/analytics-entry.component';
import { AnalyticsService } from './services/analytics.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AnalyticsEntryComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers:[
    AnalyticsService
  ]
})
export class AnalyticsModule { }
