import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/components/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferComponent } from './home/components/offer/offer.component';
import { NewsletterComponent } from '../newsletter/newsletter/newsletter.component';
import { CalendarModule } from '../calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    FlexLayoutModule,
    MatIconModule,
    NbContextMenuModule,
    NbCardModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    NbInputModule,
    NbIconModule,
    NbAlertModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    HomeComponent,
    OfferComponent,
    NewsletterComponent

  ]
})
export class MainModule { }
