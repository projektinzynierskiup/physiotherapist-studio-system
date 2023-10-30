import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { MainModule } from './modules/main/main.module';
import { NbMenuModule, NbThemeModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { StoreModule } from '@ngrx/store';
import { AuthenticationReducer } from './modules/authentication/store/authentication.reducers';
import { AuthenticationEffects } from './modules/authentication/store/authentication.effects';
import { EffectsModule } from '@ngrx/effects';
import { Effects } from './store/app.effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    AuthenticationModule,
    FlexLayoutModule,
    EffectsModule.forRoot([...Effects]),
    NbMenuModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(AuthenticationReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
