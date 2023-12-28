import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { ReviewsPage } from 'src/app/modules/shared/models/reviewspage.model';
import { Store } from '@ngrx/store';
import { setLastPageVisited } from 'src/app/modules/main/store/main.actions';
import { AppState } from 'src/app/store/app.states';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { selectIsAuthenticated, selectUser } from 'src/app/modules/authentication/store/authentication.selectors';
import { Subscription } from 'rxjs';
import { User } from 'src/app/modules/shared/models/user.model';
import { Review } from 'src/app/modules/shared/models/review.model';

@Component({
  selector: 'app-reviews-entry',
  templateUrl: './reviews-entry.component.html',
  styleUrls: ['./reviews-entry.component.scss']
})
export class ReviewsEntryComponent implements OnInit, OnDestroy {
  isAuthenticatedSubscription?: Subscription
  userSubscription?: Subscription

  addReviewForm: FormGroup;
  isAuthenticated?: boolean  
  user!: User;

  reviewSent: boolean = false

  reviews?: Review[]
  currentPage: number = 1
  totalPages: number = 1
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private reviewsService:  ReviewsService
  ) {
    this.isAuthenticatedSubscription = this.store.select(selectIsAuthenticated).subscribe(res => {
      this.isAuthenticated = res
    })

    this.userSubscription = this.store.select(selectUser).subscribe(res => {
      if(res) {
        this.user = res
      }
    })

    this.addReviewForm = this.fb.group({
      username: [this.isAuthenticated ? this.user?.username : '', Validators.required],
      rate: [0, [Validators.required]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setLastPageVisited({url: '/reviews'}))

    this.getPage(0)
  }

  submitForm() {
    if (this.addReviewForm.valid) {
      // Wysyłanie danych do serwera lub inne operacje
      console.log('Formularz został wysłany:', this.addReviewForm.value);
      this.reviewsService.createOpinion( this.addReviewForm.value).subscribe(res => {
        console.log(res)
        this.reviewSent = true
        this.getPage(0)
      })
    }
  }

  getPage(page: number) {
    this.reviewsService.getOpinions(page).subscribe((res : ReviewsPage) => {
      if(res) {
        this.reviews = res.content
        this.totalPages = res.totalPages
        console.log(res)
      }
    })
    console.log(this.reviews)
  }

  onRatingChange(rating: number) {
    // Handle the rating change event
    console.log(rating)
    this.addReviewForm.get('rate')?.setValue(rating);
  }

  nextPage() {
    this.currentPage++
    this.getPage(this.currentPage-1)
  }

  prevPage() {
    this.currentPage--
    this.getPage(this.currentPage-1)
  }

  ngOnDestroy(): void {
    if(this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe()
    if(this.userSubscription) this.userSubscription.unsubscribe()
  }
}