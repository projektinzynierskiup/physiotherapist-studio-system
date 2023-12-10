// star-rating.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
    <nb-icon
      *ngFor="let star of stars"
      [icon]="star <= rating ? 'star' : 'star-outline'"
      [options]="{ 'status': star <= rating ? 'primary' : 'basic' }"
      (click)="select(star)"
    ></nb-icon>
  `,
  styles: [`
    nb-icon {
      font-size: 24px;
      cursor: pointer;
      margin: 0 2px;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: number[] = [];

  ngOnInit() {
    this.stars = Array.from({ length: 5 }, (_, index) => index + 1);
  }


  select(star: number) {
    // Update the rating and emit the change event when clicking on a star
    this.rating = star;
    this.ratingChange.emit(this.rating);
  }
}
