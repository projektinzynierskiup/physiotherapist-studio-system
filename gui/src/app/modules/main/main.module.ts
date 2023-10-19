import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';

import {
  NbLayoutModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    HomeComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    
    NbLayoutModule,

  ]
})
export class MainModule { }
