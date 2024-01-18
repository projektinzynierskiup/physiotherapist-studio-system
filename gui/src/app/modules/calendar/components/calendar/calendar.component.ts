import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { setLastPageVisited } from 'src/app/modules/main/store/main.actions';
import { Calendar, CalendarCell, CalendarDay, CalendarWeek } from 'src/app/modules/shared/models/calendar.model';
import { AppState } from 'src/app/store/app.states';
import { CalendarService } from '../../services/calendar.service';
import { Appointment } from 'src/app/modules/shared/models/appointment.model';
import { setCalendarUpdate, setWeeklyFreeSlots } from '../../store/calendar.actions';
import { Subscription } from 'rxjs';
import { selectCalendarUpdate } from '../../store/calendar.selectors';
import { Moment } from 'moment';
import { Email } from 'src/app/modules/shared/models/email.model';
import { EmailService } from 'src/app/modules/shared/services/email.service';
import { setEditAppointment } from 'src/app/modules/booking/store/booking.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  subscriptionCalendarChange? : Subscription

  calendarData: CalendarWeek[] = []
  currentWeek = 0
  freeSlotForm: FormGroup
  endTime: any
  
  currentDateTime: string = moment().locale('pl').format('LLL')

  configurationMode: boolean = false

  expanded: number = moment().day() - 1
  nextVisitStart: string = ''
  nextVisitEnd: string = ''

  configurationCalendar? : [
    {
      day: string,
      startOfTheDay: string,
      endOfTheDay: string,
      breaks: string,
    }
  ]

  generalWorkingHours : {
    startHours: number,
    startMinutes: number,
    endHours: number,
    endMinutes: number,
    visitLength: number,
    breaks:number
  } = {
    startHours: 8,
    startMinutes: 0,
    endHours: 16,
    endMinutes: 0,
    visitLength: 55,
    breaks: 5
  }

  singleWorkingTime : {
    startHours: number,
    startMinutes: number,
    endHours: number,
    endMinutes: number,
    visitLength: number,
    breaks:number
  } = {
    startHours: 8,
    startMinutes: 0,
    endHours: 16,
    endMinutes: 0,
    visitLength: 55,
    breaks: 5
  }

  selectedWorkDays: string[] = [];

  differentWorkHours:{
    day: string,
    startHours: number,
    startMinutes: number,
    endHours: number,
    endMinutes: number,
    visitLength: number,
    breaks:number
  }[] = []

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: NbDialogService,
    private calendarService: CalendarService,
    private emailService: EmailService
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
    
    setInterval(() => {
      this.currentDateTime = moment().locale('pl').format('LLL')
    }, 1000);

    this.resetCalendar()
    this.getWeek(this.calendarData[this.currentWeek].days[0].day)

    console.log(this.calendarData)

    this.differentWorkHours = this.calendarData[this.currentWeek].days.map(day => ({
      day: day.day,
      ...this.generalWorkingHours
    }));
    
    this.subscriptionCalendarChange = this.store.select(selectCalendarUpdate).subscribe(res => {
      if(res) {
        
        this.resetCalendar()
        this.getWeek(this.calendarData[this.currentWeek].days[0].day)
        this.store.dispatch(setCalendarUpdate({flag: false}))
      }
    })
  }

  resetCalendar() {
    if(this.currentWeek == 0) {
      const firstWeek = this.generateFirstWeek()
      this.calendarData = []
      if(firstWeek) this.calendarData.push(firstWeek)
    } else {
      this.calendarData.splice(this.currentWeek, 1)
      const nextWeek = this.generateNextWeek()

      if(nextWeek) this.calendarData.push(nextWeek)
      this.getWeek(this.calendarData[this.currentWeek].days[0].day)

    }
  }

  openDialog(dialog: TemplateRef<any>, data : string) {
    this.dialogService.open(dialog, { context: data });
  }

  openCancelDialog(dialog: TemplateRef<any>, data : Appointment | undefined) {
    this.dialogService.open(dialog, {context: data});
  }

  deleteAppointment( data : Appointment | undefined, sendRejection: boolean) {
    if(data && data.id) {
      this.resetCalendar()
      this.calendarService.deleteAppointment(data.id).subscribe(res => {
        console.log(res)
        if(sendRejection) this.sendRejection(data)
        this.store.dispatch(setCalendarUpdate({flag: true}))
      })
      this.getWeek(this.calendarData[this.currentWeek].days[0].day)
    }
  }

 cancelAppointment( data : Appointment | undefined) {
    if(data && data.id) {
      this.resetCalendar()
      this.calendarService.deleteAppointment(data.id).subscribe(res => {
        console.log(res)
      })
      this.getWeek(this.calendarData[this.currentWeek].days[0].day)
    }
  }

  finishAppointment( data : Appointment | undefined) {
    if(data && data.id) {
      this.resetCalendar()
      
      this.calendarService.finishAppointment(data.id).subscribe(res => {
        console.log(res)
      })
      this.store.dispatch(setCalendarUpdate({flag: true}))

    }
  }

  goToEdit(appointment? : Appointment) {
    if(appointment) {
      this.store.dispatch(setEditAppointment({appointment : appointment}))

      this.goToBooking()
    }
  }

  goToBooking() {
    this.router.navigateByUrl('/booking');
  }

  sendRejection(appointment : Appointment) {
    const email : Email = {
      visitId: appointment.id,
      recipientEmail: appointment.usersDTO.email,
      startTime: appointment.startDate + ".000Z",
      endTime: appointment.endDate + ".000Z",
      username: appointment.usersDTO.username,
      eventName: appointment.massageDTO.massageName,
      description: "Wizyta została anulowany",
      emailStatus: "REJECTION"
    }

    this.emailService.sendEmail(email).subscribe(res => {
      console.log(res)
    })
  }

  onTimeChange(type: 'start' | 'end' | 'breaks' | 'length', general : boolean) {
    if(general) {
      this.differentWorkHours = this.differentWorkHours.map(day => {
        const updatedDay = { ...day }; // Create a copy of the day object
        
        if (type === 'start') {
          updatedDay.startHours = this.generalWorkingHours.startHours;
          updatedDay.startMinutes = this.generalWorkingHours.startMinutes;
        } else if (type === 'end') {
          updatedDay.endHours = this.generalWorkingHours.endHours;
          updatedDay.endMinutes = this.generalWorkingHours.endMinutes;
        } else if (type === 'breaks') {
          updatedDay.breaks = this.generalWorkingHours.breaks;
        } else if (type === 'length') {
          updatedDay.visitLength = this.generalWorkingHours.visitLength;
        }
        
        return updatedDay;
      });
    } else {
      this.generateNextVisit();
    }
  }

  toggleConfiguration() {
    this.configurationMode = !this.configurationMode
  }

  generateCalendar() {
    var workDays : any[] = []

    this.selectedWorkDays.map(day => {
      const workHours = this.differentWorkHours.find(days => days.day == day)
      if(workHours) {
        workDays.push({
          startDate:day + "T" + (workHours.startHours < 10 ? '0' +  workHours.startHours : workHours.startHours) + ":" 
          + (workHours.startMinutes < 10 ? '0' +  workHours.startMinutes :  workHours.startMinutes) + ":00",
          endDate: day + "T" + ( workHours.endHours < 10 ? '0' +  workHours.endHours : workHours.endHours) + ":" 
          + (workHours.endMinutes < 10 ? '0' +  workHours.endMinutes :  workHours.endMinutes) + ":00"
        })
      } else {
        workDays.push({
          startDate:day + "T" + ( this.generalWorkingHours.startHours < 10 ? '0' +  this.generalWorkingHours.startHours : this.generalWorkingHours.startHours) + ":" 
          + (this.generalWorkingHours.startMinutes < 10 ? '0' +  this.generalWorkingHours.startMinutes :  this.generalWorkingHours.startMinutes) + ":00",
          endDate: day + "T" + ( this.generalWorkingHours.endHours < 10 ? '0' +  this.generalWorkingHours.endHours : this.generalWorkingHours.endHours) + ":" 
          + (this.generalWorkingHours.endMinutes < 10 ? '0' +  this.generalWorkingHours.endMinutes :  this.generalWorkingHours.endMinutes) + ":00"
        })
      }
    })

    this.store.dispatch(setWeeklyFreeSlots({workDays: workDays}))
  }


  addFreeSlot(index: number, day: string, startHours: number, startMinutes: number, visitLength: number, breakLength: number) {
    const start = day + "T" + (startHours < 10 ? '0' + startHours : startHours) + ":" +
      (startMinutes < 10 ? '0' + startMinutes : startMinutes) + ":00";
  
      const end = moment(start).add(visitLength, 'minutes').format("YYYY-MM-DDTHH:mm:ss")
      this.calendarService.addFreeSlot(start, end).subscribe(res => {
        try{

          if(res) {
            this.store.dispatch(setCalendarUpdate({flag: true}))
          }
        } catch(e : any) {
          return
        }
      })

    if(visitLength + breakLength < 60) {
      this.differentWorkHours[index].startMinutes += visitLength + breakLength
    } else if(visitLength + breakLength > 60) {
      this.differentWorkHours[index].startHours += Math.floor((visitLength + breakLength) / 60)
      this.differentWorkHours[index].startMinutes += visitLength + breakLength - Math.floor((visitLength + breakLength) / 60) * 60 

    } else if((visitLength + breakLength) % 60 == 0) {
      this.differentWorkHours[index].startHours += Math.floor((visitLength + breakLength) / 60)

    }

    if(this.differentWorkHours[index].startMinutes > 60) {
      this.differentWorkHours[index].startHours += 1
      this.differentWorkHours[index].startMinutes -= 60
    }
  }

  generateSingleFreeSlot(day : string) {
    this.store.dispatch(setWeeklyFreeSlots({workDays: [{
      startDate:day + "T" + (this.singleWorkingTime.startHours < 10 ? '0' +  this.singleWorkingTime.startHours : this.singleWorkingTime.startHours) + ":" 
      + (this.singleWorkingTime.startMinutes < 10 ? '0' +  this.singleWorkingTime.startMinutes :  this.singleWorkingTime.startMinutes) + ":00",
      endDate: day + "T" + ( this.singleWorkingTime.endHours < 10 ? '0' +  this.singleWorkingTime.endHours : this.singleWorkingTime.endHours) + ":" 
      + (this.singleWorkingTime.endMinutes < 10 ? '0' +  this.singleWorkingTime.endMinutes :  this.singleWorkingTime.endMinutes) + ":00"
    }]}))
  }

  generateNextVisit() {
    this.nextVisitStart = ( this.differentWorkHours[this.expanded].startHours < 10 ? '0' +  this.differentWorkHours[this.expanded].startHours :  this.differentWorkHours[this.expanded].startHours) + ":" +
    (this.differentWorkHours[this.expanded].startMinutes < 10 ? '0' + this.differentWorkHours[this.expanded].startMinutes : this.differentWorkHours[this.expanded].startMinutes);
    this.nextVisitEnd = moment(this.nextVisitStart, "HH:mm").add(this.differentWorkHours[this.expanded].visitLength, 'minutes').format("HH:mm")
  }

  // onSubmitFreeSlot(day: any) {

  //   const values = this.freeSlotForm.getRawValue()
  //   const startDate = day + "T" + (values.startHours < 10 ? '0' + values.startHours : values.startHours) + ":" + (values.startMinutes < 10 ? '0' + values.startMinutes : values.startMinutes)
  //   const endDate = day + "T" + (values.endHours < 10 ? '0' + values.endHours : values.endHours) + ":" + (values.endMinutes < 10 ? '0' + values.endMinutes : values.endMinutes)

  //   this.calendarService.addFreeSlot(startDate, endDate)
  // }

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
        this.loadCalendar(res)
      }
    })
  }

  expand(i: number) {
    this.expanded = i;
    const visits = this.calendarData[this.currentWeek].days[this.expanded]?.cells;
    if(!visits) return
    if (visits?.length > 0) {
      const lastElementEndDate = moment(visits[visits.length - 1].endDate, "HH:mm");

      const modifiedEndDate = lastElementEndDate.clone().add(this.differentWorkHours[this.expanded].breaks, 'minutes');

        this.differentWorkHours[this.expanded].startHours = moment(modifiedEndDate).get('hour')
        this.differentWorkHours[this.expanded].startMinutes = moment(modifiedEndDate).get('minutes')

        this.generateNextVisit();

    } else {
      this.differentWorkHours[this.expanded].startHours = this.generalWorkingHours.startHours
      this.differentWorkHours[this.expanded].startMinutes = this.generalWorkingHours.startMinutes
      this.generateNextVisit();
    }
  }
  
  getBreak(lastEndDate: string, nextDate: any) {
    if(nextDate) {
      const timeDifferenceMinutes =  moment(nextDate.startDate, 'HH:mm').diff(moment(lastEndDate, 'HH:mm'), 'minutes')

      if (timeDifferenceMinutes >= 60) {
        // If the difference is 60 minutes or more, format as hours and minutes
        const hours = Math.floor(timeDifferenceMinutes / 60);
        const remainingMinutes = timeDifferenceMinutes % 60;
      
        return `${hours}h ${remainingMinutes}min`;
      } else {
        return`${timeDifferenceMinutes}min`;
      }
    } else {
      return ''
    }
  }

  loadCalendar(res : any[]) {
    res.map(data => {
      var day = this.calendarData[this.currentWeek].days.find(day => day.day == data.localDate.split("T")[0])
      if(day) {
        day.cells = []
        data.appointmentDTOList.map((appointment : any) => {
          day?.cells.push({
            startDate: moment(appointment.startDate).format("HH:mm"),
            endDate: moment(appointment.endDate).format("HH:mm"),
            isBooked: appointment.status == 'BOOKED',
            isFinished: appointment.status == 'FINISHED',
            appointment: appointment,
            isExpanded: false
          })
        })
        console.log(day)
      }
    })
    this.expand(this.expanded)

  }

  triggerCellExpand(cell: CalendarCell) {
    cell.isExpanded = !cell.isExpanded
  }

  ngOnDestroy(): void {

  }

  getDayName(day : string) {
    return moment(day).locale('pl').format('dddd')
  }

  formatDate(day : string) {
    return "<b>" + moment(day).locale('pl').format('dddd') + "</b><br>" + moment(day).locale('pl').format('L')
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
        today: currentDay.isSame(moment(), 'day'),
        passed: currentDay.isBefore(moment(), 'day'),
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
        today: currentDay.isSame(moment(), 'day'),
        passed: currentDay.isBefore(moment(), 'day'),
        cells: []
      });
      currentDay.add(1, 'day');
    }

    console.log(week)
  
    return week
  }

  getBackground() {
    return `../../../../assets/background3.jpg`
  }

}
