import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationEntryComponent } from './administration-entry/administration-entry.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbCardModule, NbInputModule, NbTooltipModule, NbCheckboxModule, NbDialogModule, NbSelectModule } from '@nebular/theme';
import { TruncatePipe } from '../shared/services/truncate.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NumberInputDirective } from './directives/number-input.directive';



@NgModule({
  declarations: [
    AdministrationEntryComponent,
    TruncatePipe,
    NumberInputDirective
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
    NbSelectModule,
    NbCheckboxModule,
    CommonModule,
    MatTooltipModule,
    NbDialogModule
  ],
  exports: [
    NumberInputDirective
  ]
})
export class AdministrationModule { }
