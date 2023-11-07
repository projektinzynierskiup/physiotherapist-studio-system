import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { MainModule } from './modules/main/main.module';
import { NbMenuModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { StoreModule } from '@ngrx/store';
import { AuthenticationEffects } from './modules/authentication/store/authentication.effects';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/app.reducers';
import { RoleGuard } from './modules/authentication/guards/role.guard';
import { AccountModule } from './modules/account/account.module';
import { BookingModule } from './modules/booking/booking.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AccountModule,
    BookingModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    AuthenticationModule,
    FlexLayoutModule,
    EffectsModule.forRoot([...Effects]),
    NbMenuModule.forRoot(),
    HttpClientModule,
    NbToastrModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    NbEvaIconsModule
  ],
  providers: [
    AuthenticationGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }
