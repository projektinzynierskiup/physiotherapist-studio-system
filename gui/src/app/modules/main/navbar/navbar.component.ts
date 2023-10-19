import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/navbar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  menuItems : MenuItem[] = []

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.menuItems = [
      {
        title: 'home',
        url: '/home',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN']
      },
      {
        title: 'booking',
        url: 'booking',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN']
      },
      {
        title: 'reviews',
        url: '/reviews',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN']
      },
      {
        title: 'calendar',
        url: '/calendar',
        permissions: ['MOD', 'ADMIN']
      },
      {
        title: 'analytics',
        url: '/analytics',
        permissions: ['MOD', 'ADMIN']
      },
      {
        title: 'login',
        url: '/login',
        permissions: ['GUEST', 'USER', 'MOD', 'ADMIN']
      },
      {
        title: 'register',
        url: '/register',
        permissions: ['GUEST', 'ADMIN']
      },
      {
        title: 'account',
        url: '/account',
        permissions: ['USER', 'MOD', 'ADMIN']
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
