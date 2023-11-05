import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { MainModule } from './modules/main/main.module';
import {
  NbDialogModule,
  NbDialogService,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbThemeModule
} from '@nebular/theme';
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
import { OpinionComponent } from './modules/opinion/opinion.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TestComponent } from './modules/test/test.component';

let NbEvaIconsModule;

@NgModule({
  declarations: [
    AppComponent,
    OpinionComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AccountModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    AuthenticationModule,
    FlexLayoutModule,
    EffectsModule.forRoot([...Effects]),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    FormsModule,
    NbLayoutModule,
    NbIconModule,
    ReactiveFormsModule
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
