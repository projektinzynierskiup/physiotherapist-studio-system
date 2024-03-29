import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { MainModule } from './modules/main/main.module';
import { NbDialogModule, NbDialogService, NbIconModule, NbLayoutModule, NbMenuModule, NbThemeModule, NbTimepickerModule, NbToastrModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/app.reducers';
import { RoleGuard } from './modules/authentication/guards/role.guard';
import { AccountModule } from './modules/account/account.module';
import { BookingModule } from './modules/booking/booking.module';
import { OpinionComponent } from './modules/opinion/opinion.component';
import { TestComponent } from './modules/test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CalendarModule } from './modules/calendar/calendar.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AdministrationModule } from './modules/administration/administration.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SharedModule } from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    OpinionComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AccountModule,
    BookingModule,
    ReviewsModule,
    AdministrationModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    AuthenticationModule,
    FlexLayoutModule,
    EffectsModule.forRoot([...Effects]),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    HttpClientModule,
    NbToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    NbTimepickerModule.forRoot(),
    FormsModule,
    NbLayoutModule,
    NbIconModule,
    AnalyticsModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    CalendarModule,
    SharedModule
  ],
  providers: [
    AuthenticationGuard,
    RoleGuard,
    NbDialogService,
    OpinionComponent
  ],
  bootstrap: [AppComponent],
  exports: [
    OpinionComponent
  ],
  entryComponents: [AppComponent]
})
export class AppModule { }
