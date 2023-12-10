import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEntryComponent } from './account-entry/account-entry.component';
import { AccountCardComponent } from './account-entry/account-card/account-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbOptionModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AccountEntryComponent,
    AccountCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    FormsModule,
    NbInputModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbOptionModule,
    NbCardModule,
    FlexLayoutModule
  ], 
  entryComponents: [
    AccountEntryComponent,
    AccountCardComponent
  ]
})
export class AccountModule { }
