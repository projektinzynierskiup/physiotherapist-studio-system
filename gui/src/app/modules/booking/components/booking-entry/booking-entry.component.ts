import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { setLastPageVisited } from '../../../main/store/main.actions';

@Component({
  selector: 'app-booking-entry',
  templateUrl: './booking-entry.component.html',
  styleUrls: ['./booking-entry.component.scss']
})
export class BookingEntryComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(setLastPageVisited({url: '/booking'}))
  }

  ngOnDestroy(): void {
    
  }
}
