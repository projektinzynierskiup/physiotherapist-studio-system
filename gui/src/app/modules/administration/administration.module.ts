import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationEntryComponent } from './administration-entry/administration-entry.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbTooltipModule, NbCheckboxModule } from '@nebular/theme';
import { TruncatePipe } from '../shared/services/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    AdministrationEntryComponent,
    TruncatePipe 
  ],
  imports: [
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    FormsModule,
    NbInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NbCardModule,
    NbTooltipModule,
    FlexLayoutModule,
    NbButtonModule,
    NbCheckboxModule,
    CommonModule,
    MatTooltipModule
  ]
})
export class AdministrationModule { }
