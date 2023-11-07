import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsEntryComponent } from './reviews-entry.component';

describe('ReviewsEntryComponent', () => {
  let component: ReviewsEntryComponent;
  let fixture: ComponentFixture<ReviewsEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
