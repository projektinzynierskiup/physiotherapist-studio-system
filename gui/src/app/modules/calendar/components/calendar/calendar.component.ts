import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { setLastPageVisited } from 'src/app/modules/main/store/main.actions';
import { Calendar, CalendarCell, CalendarDay, CalendarWeek } from 'src/app/modules/shared/models/calendar.model';
import { AppState } from 'src/app/store/app.states';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  calendarData: CalendarWeek[] = []
  currentWeek = 0
  freeSlotForm: FormGroup
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
    private calendarService: CalendarService
  ) {
    this.freeSlotForm = this.fb.group({
      startHours: ['', [Validators.required]],
      startMinutes: ['', [Validators.required]],
      endHours: ['', [Validators.required]],
      endMinutes: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setLastPageVisited({url: '/calendar'}))

    const firstWeek = this.generateFirstWeek()

    if(firstWeek) this.calendarData.push(firstWeek)
    this.getWeek(this.calendarData[this.currentWeek].days[0].day)

    console.log(this.calendarData)

  }

  openDialog(dialog: TemplateRef<any>, data : string) {

    this.dialogService.open(dialog, { context: data });
  }

  onSubmitFreeSlot() {

  }

  changeCurrentWeek(step : number) {
    this.currentWeek += step

    if(!this.calendarData[this.currentWeek]) {
      const nextWeek = this.generateNextWeek()

      if(nextWeek) this.calendarData.push(nextWeek)

      this.getWeek(this.calendarData[this.currentWeek].days[0].day)
    } 
  }

  getWeek(startDate : string) {
    this.calendarService.getCalendar(startDate).subscribe((res : any) => {
      if(res) {
        console.log(res)
      }
    })
  }

  ngOnDestroy(): void {

  }

  generateFirstWeek() : CalendarWeek | undefined {
    var week : CalendarWeek | undefined = undefined
    
    console.log(moment().startOf('isoweek' as moment.unitOfTime.StartOf).format("YYYY-MM-DD"))

    const startOfWeek = moment().startOf('isoweek' as moment.unitOfTime.StartOf)
    const endOfWeek = moment().endOf('isoweek' as moment.unitOfTime.StartOf)

    let currentDay = startOfWeek;

    week = {
      week: startOfWeek.format('YYYY-MM-DD') + " - " + endOfWeek.format('YYYY-MM-DD'),
      days: []
    }

    while (currentDay.isSameOrBefore(endOfWeek)) {
      week.days.push({
        day: currentDay.format('YYYY-MM-DD'),
        cells: []
      });
      currentDay.add(1, 'day');
    }

    console.log(week)
  
    return week
  }
 
  generateNextWeek() {
    var week : CalendarWeek | undefined = undefined
    
    console.log(moment().startOf('isoweek' as moment.unitOfTime.StartOf).format("YYYY-MM-DD"))

    const startOfWeek = moment().startOf('isoweek' as moment.unitOfTime.StartOf).add(this.currentWeek, 'weeks')
    const endOfWeek = moment().endOf('isoweek' as moment.unitOfTime.StartOf).add(this.currentWeek, 'weeks')

    let currentDay = startOfWeek;

    week = {
      week: startOfWeek.format('YYYY-MM-DD') + " - " + endOfWeek.format('YYYY-MM-DD'),
      days: []
    }

    while (currentDay.isSameOrBefore(endOfWeek)) {
      week.days.push({
        day: currentDay.format('YYYY-MM-DD'),
        cells: []
      });
      currentDay.add(1, 'day');
    }

    console.log(week)
  
    return week
  }
}
