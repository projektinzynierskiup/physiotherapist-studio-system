import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/navbar.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AuthorizationService } from '../../authentication/services/authorization.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { selectIsAuthenticated } from '../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  menuItems : MenuItem[] = []

  isAuthenticatedSubscription?: Subscription

  isAuthenticated?: boolean  
  
  accountActions : any[] = []
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {

    this.isAuthenticatedSubscription = this.store.select(selectIsAuthenticated).subscribe(res => {
      this.isAuthenticated = res
    })

    this.menuItems = [
      {
        title: 'Strona główna',
        url: '/home',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'home',
        loginRequired: false
      },
      {
        title: 'Rezerwacja',
        url: 'booking',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'assignment',
        loginRequired: false
      },
      {
        title: 'Opinie',
        url: '/reviews',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'rate_review',
        loginRequired: false
      },
      {
        title: 'Kalendarz',
        url: '/calendar',
        permissions: ['MOD', 'ADMIN'],
        icon: 'calendar_today',
        loginRequired: true
      },
      {
        title: 'Analityka',
        url: '/analytics',
        permissions: ['MOD', 'ADMIN'],
        icon: ' show_chart',
        loginRequired: true
      },
      {
        title: 'Administracja',
        url: '/administration',
        permissions: ['MOD', 'ADMIN'],
        icon: 'settings-2-outline',
        loginRequired: true
      }

      
    ]

    this.accountActions = [
      {
        title: 'Zaloguj się',
        url: '/login',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'login',
        loginRequired: false,
        hideAfterLogin: true
      },
      {
        title: 'Zarejestruj się',
        url: '/register',
        permissions: ['GUEST', 'ADMIN'],
        icon: 'person_add',
        loginRequired: false,
        hideAfterLogin: true
      },
      {
        title: 'Moje konto',
        url: 'account',
        permissions: ['USER', 'MOD', 'ADMIN'],
        icon: 'account_circle',
        loginRequired: true,
      },
      {
        title: 'Wyloguj się',
        url: 'logout',
        permissions: ['USER', 'MOD', 'ADMIN'],
        icon: 'logout',
        loginRequired: true
      }
    ]
  }

  onModuleClick(item: MenuItem) {
    if(item.title && item.url) {
      this.router.navigate([item.url]);
    }
  }

  canDisplay(item : MenuItem) {
    return (!item.loginRequired || this.isAuthenticated) && (!item.hideAfterLogin || !this.isAuthenticated) && 
      (item.permissions ? this.authorizationService.hasPermission(item.permissions) : true)
  }

  ngOnDestroy(): void {
    if(this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe()

  }


}
