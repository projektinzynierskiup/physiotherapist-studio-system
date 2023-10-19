import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthenticationService } from "./services/authentication.service";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
   imports: [
     RouterModule,

   ],
   declarations: [
   
   
    LoginComponent,
             RegisterComponent
  ],
   providers: [
      AuthenticationGuard,
      AuthenticationService
   ],
 })
 export class AuthenticationModule { }
 