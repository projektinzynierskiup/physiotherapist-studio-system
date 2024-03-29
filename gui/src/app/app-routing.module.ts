import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './modules/main/main/main.component';
import { HomeComponent } from './modules/main/home/components/home.component';
import { BookingEntryComponent } from './modules/booking/components/booking-entry/booking-entry.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { AccountEntryComponent } from './modules/account/account-entry/account-entry.component';
import { AnalyticsEntryComponent } from './modules/analytics/analytics-entry/analytics-entry.component';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { LogoutComponent } from './modules/authentication/components/logout/logout.component';
import { RoleGuard } from './modules/authentication/guards/role.guard';
import { AdministrationEntryComponent } from './modules/administration/administration-entry/administration-entry.component';
import { ResetPasswordComponent } from './modules/authentication/components/reset-password/reset-password.component';
import { LoginGuard } from './modules/authentication/guards/login.guard';
import { CalendarEntryComponent } from './modules/calendar/components/calendar-entry/calendar-entry.component';
import { ReviewsEntryComponent } from './modules/reviews/components/reviews-entry/reviews-entry.component';
import { CancelNewsletterComponent } from './modules/shared/components/cancel-newsletter.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [],
    component: MainComponent,

    children: [
      {
        path: 'home',
        canActivate: [],
        component: HomeComponent
      },
      {
        path: 'booking',
        canActivate: [],
        component: BookingEntryComponent
      },
      {
        path: 'reviews',
        canActivate: [],
        component: ReviewsEntryComponent
      },
      {
        path: 'calendar',
        canActivate: [AuthenticationGuard, RoleGuard],
        component: CalendarEntryComponent,
        data: {
          permissions: ['MOD', 'ADMIN']
        }
      },
      {
        path: 'analytics',
        canActivate: [AuthenticationGuard, RoleGuard],
        component: AnalyticsEntryComponent,
        data: {
          permissions: ['MOD', 'ADMIN']
        }
      },
      {
        path: 'administration',
        canActivate: [AuthenticationGuard, RoleGuard],
        component: AdministrationEntryComponent,
        data: {
          permissions: ['MOD', 'ADMIN']
        }
      },
      {
        path: 'account',
        canActivate: [AuthenticationGuard],
        component: AccountEntryComponent
      },
      {
        path: 'logout',
        canActivate: [AuthenticationGuard],
        component: LogoutComponent
      }
    ]
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [],
    component: RegisterComponent
  },
  {
    path: 'guest/users/restartpassword/:uuid',
    canActivate: [LoginGuard],
    component: ResetPasswordComponent
  },
  {
    path: 'newsletter/cancel/:uuid',
    canActivate: [],
    component: CancelNewsletterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
