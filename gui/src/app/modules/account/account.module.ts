import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEntryComponent } from './account-entry/account-entry.component';
import { AccountCardComponent } from './account-entry/account-card/account-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbCardModule, NbButtonModule, NbInputModule, NbSelectModule, NbOptionModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountService } from './services/account.service';
import { HttpClientModule } from '@angular/common/http';



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
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule
  ], 
  entryComponents: [
    AccountEntryComponent,
    AccountCardComponent
  ],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
