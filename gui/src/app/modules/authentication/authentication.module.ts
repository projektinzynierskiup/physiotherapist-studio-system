import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthenticationService } from "./services/authentication.service";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbLayoutModule,
  NbTooltipModule
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { LogoutComponent } from "./components/logout/logout.component";
import { RoleGuard } from "./guards/role.guard";
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CommonModule } from "@angular/common";

@NgModule({
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
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ResetPasswordComponent
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    RoleGuard
  ],
})

export class AuthenticationModule { }