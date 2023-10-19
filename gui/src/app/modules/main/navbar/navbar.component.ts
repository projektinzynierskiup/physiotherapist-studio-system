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
        url: '/home'
      },
      {
        title: 'book-visit',
        url: 'book-visit'
      },
      {
        title: 'reviews',
        url: '/reviews'
      },
      {
        title: 'login',
        url: '/login'
      },
      {
        title: 'register',
        url: '/register'
      },
      {
        title: 'account',
        url: '/account'
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
