import { Component } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { ReviewsPage } from 'src/app/modules/shared/models/reviewspage.model';

@Component({
  selector: 'app-reviews-entry',
  templateUrl: './reviews-entry.component.html',
  styleUrls: ['./reviews-entry.component.scss']
})
export class ReviewsEntryComponent {
  opinionPage: ReviewsPage | undefined;

  constructor(private opinionService: ReviewsService) { }

  ngOnInit(): void {
    this.getOpinions(0);
  }

  getOpinions(page: number): void {
    if (page < 0) {
      page = 0; // Ustaw stronę na 0, jeśli argument jest mniejszy niż 0
    }
    this.opinionService.getOpinions(page).subscribe({
      next: (data) => {
        this.opinionPage = data;
        console.log(this.opinionPage);
      },
      error: (e) => console.error(e)
    });
  }

  submitOpinion(formValue: any): void {
    this.opinionService.createOpinion(formValue).subscribe(
      response => {
        this.ngOnInit();
        console.log(response);
        },
      error => {
        console.error(error);
      }
    );
  }
}