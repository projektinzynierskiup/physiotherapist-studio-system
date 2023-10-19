import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { MainModule } from './modules/main/main.module';
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    NbThemeModule.forRoot()
  ],
  providers: [
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
