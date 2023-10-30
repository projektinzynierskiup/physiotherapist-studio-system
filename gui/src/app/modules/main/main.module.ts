import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import {
  NbContextMenuModule,
  NbLayoutModule
} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbLayoutModule,
    FlexLayoutModule,
    MatIconModule,
    NbContextMenuModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    HomeComponent

  ]
})
export class MainModule { }
