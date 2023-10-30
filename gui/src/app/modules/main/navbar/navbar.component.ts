import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/navbar.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  menuItems : MenuItem[] = []
  isLogged : boolean = false
  accountActions : any[] = []
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

    this.isLogged = this.authenticationService.getToken() != undefined
    console.log(this.isLogged)

    this.menuItems = [
      {
        title: 'home',
        url: '/home',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'home',
        loginRequired: false
      },
      {
        title: 'booking',
        url: 'booking',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'assignment',
        loginRequired: false
      },
      {
        title: 'reviews',
        url: '/reviews',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: 'rate_review',
        loginRequired: false
      },
      {
        title: 'calendar',
        url: '/calendar',
        permissions: ['MOD', 'ADMIN'],
        icon: 'calendar_today',
        loginRequired: false
      },
      {
        title: 'analytics',
        url: '/analytics',
        permissions: ['MOD', 'ADMIN'],
        icon: ' show_chart',
        loginRequired: true
      }

      
    ]

    this.accountActions = [
      {
        title: 'login',
        url: '/login',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN'],
        icon: '',
        loginRequired: false,
        hideAfterLogin: true
      },
      {
        title: 'register',
        url: '/register',
        permissions: ['GUEST', 'ADMIN'],
        icon: '',
        loginRequired: false,
        hideAfterLogin: true
      },
      {
        title: 'account',
        url: 'account',
        permissions: ['USER', 'MOD', 'ADMIN'],
        icon: 'account_circle',
        loginRequired: true,
      },
      {
        title: 'logout',
        url: 'logout',
        permissions: ['USER', 'MOD', 'ADMIN'],
        icon: '',
        loginRequired: true
      }
    ]
  }

  onModuleClick(item: MenuItem) {
    if(item.title && item.url) {
      this.router.navigate([item.url]);
    }
  }

  ngOnDestroy(): void {
    
  }


}
