// star-rating.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rate',
  template: `
    <nb-icon
      *ngFor="let star of stars"
      [icon]="rating && star <= rating ? 'star' : 'star-outline'"
      [options]="{ 'status': rating && star <= rating ? 'primary' : 'basic' }"
    ></nb-icon>
  `,
})
export class StarRateComponent {
  @Input() rating?: number;

  stars: number[] = Array.from({ length: 5 }, (_, index) => index + 1);
}