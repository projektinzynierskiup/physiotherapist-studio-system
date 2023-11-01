import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEntryComponent } from './account-entry/account-entry.component';
import { AccountCardComponent } from './account-card/account-card.component';



@NgModule({
  declarations: [
    AccountEntryComponent,
    AccountCardComponent
  ],
  imports: [
    CommonModule
  ], 
  entryComponents: [
    AccountEntryComponent,
    AccountCardComponent
  ]
})
export class AccountModule { }
