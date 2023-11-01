import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { selectUser } from '../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss']
})
export class AccountCardComponent implements OnInit, OnDestroy {

  userSubscription!: Subscription

  user!: User;


  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(selectUser).subscribe(res => {
      if(res) {
        this.user = res
      }
    })
  }

  ngOnDestroy(): void {
    if(this.userSubscription) this.userSubscription.unsubscribe()
  }
}
