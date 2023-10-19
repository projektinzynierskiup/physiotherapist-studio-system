import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { AuthenticationService } from "./services/authentication.service";

@NgModule({
   imports: [
     RouterModule,

   ],
   declarations: [
   
   ],
   providers: [
      AuthenticationGuard,
      AuthenticationService
   ],
 })
 export class AuthenticationModule { }
 