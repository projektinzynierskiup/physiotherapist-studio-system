import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';

import {
  NbLayoutModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    
    NbLayoutModule,

  ]
})
export class MainModule { }
