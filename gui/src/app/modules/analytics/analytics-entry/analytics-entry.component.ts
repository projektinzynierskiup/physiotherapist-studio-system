import { Component, HostListener, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { setLastPageVisited } from '../../main/store/main.actions';
import { ExampleStatistic, Statistics } from '../../shared/models/statistics.model';
import * as moment from 'moment';

@Component({
  selector: 'app-analytics-entry',
  templateUrl: './analytics-entry.component.html',
  styleUrls: ['./analytics-entry.component.scss']
})
export class AnalyticsEntryComponent implements OnInit {

  statistics: Statistics

  year: number
  month: number

  constructor(
    private store: Store<AppState>,
    private analyticsService: AnalyticsService
  ) { 
    this.statistics = ExampleStatistic

    this.year = moment().year()
    this.month = moment().month() + 1
  }

  ngOnInit(): void {
    this.store.dispatch(setLastPageVisited({url: '/analytics'}))


    this.getStatistics()

  }

  changeYear(step : number) {
    if(this.year + step <= moment().year()) {
      this.year += step
      this.getStatistics()
    }
  }

  changeMonth(step : number) {
    if(this.month == 1 && step < 0) {
      this.month = 12
    } else if(this.month == 12 && step > 0) {
      this.month = 1
    } else {
      this.month += step
    }
    this.getStatistics()
  }

  getFormattedMonth() {
    return moment(this.month, 'MM').locale('pl').format('MMMM')
  }

  isYearNavDisabled() {
    return this.year == moment().year()
  }

  getStatistics() {
    this.analyticsService.getAnalytics(this.year.toString(), this.month.toString()).subscribe(res => {
      console.log(res)
      this.statistics = res
    })
  }

  
  getBackground() {
    return `../../../../assets/background3.jpg`
  }
}
