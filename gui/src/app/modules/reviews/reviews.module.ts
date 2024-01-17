import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbFormFieldModule, NbInputModule, NbIconModule, NbAlertModule } from '@nebular/theme';
import { ReviewsEntryComponent } from './components/reviews-entry/reviews-entry.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { StarRateComponent } from './components/star-rating/star-rate.component';
import { ReviewsService } from './services/reviews.service';



@NgModule({
  declarations: [
    ReviewsEntryComponent,
    StarRatingComponent,
    StarRateComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    FlexLayoutModule,
    MatIconModule,
    NbContextMenuModule,
    NbFormFieldModule,
    ReactiveFormsModule,
    NbInputModule,
    NbIconModule,
    NbAlertModule
  ],
  providers: [
    ReviewsService
  ]
})
export class ReviewsModule { }
