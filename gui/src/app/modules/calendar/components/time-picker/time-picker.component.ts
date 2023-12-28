import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit, OnDestroy {
  @Input() hour?: number
  @Input() minutes?: number
  @Output() timeChanged: EventEmitter<{ hour: number, minutes: number }> = new EventEmitter();
  minutesStep: number = 5
  @Output() hourChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() minutesChange: EventEmitter<number> = new EventEmitter<number>();
  
  ngOnInit(): void {
  }


  upHour() {
    if(this.hour != undefined && this.hour == 23) {
      this.hour = 0
    } else if(this.hour != undefined  && this.hour < 23) {
      this.hour += 1
    }
    this.emitTimeChanged();
  }

  downHour() {
    if(this.hour != undefined && this.hour == 0) {
      this.hour = 23
    } else if(this.hour != undefined  && this.hour > 0) {
      this.hour -= 1
    }
    this.emitTimeChanged();
  }

  upMinutes() {
    if(this.minutes != undefined && this.minutes + this.minutesStep < 60) {
      this.minutes += this.minutesStep
    } else if(this.minutes != undefined  && this.minutes + this.minutesStep >= 60)  {
      this.minutes = 0
    }
    this.emitTimeChanged();
  }

  downMinutes() {
    if(this.minutes != undefined && this.minutes - this.minutesStep >= 0) {
      this.minutes -= this.minutesStep
    } else if(this.minutes != undefined  && this.minutes == 0)  {
      this.minutes = 60 - this.minutesStep
    }
    this.emitTimeChanged();
  }

  private emitTimeChanged() {
    // Emit the timeChanged event with the updated values
    this.hourChange.emit(this.hour);
    this.minutesChange.emit(this.minutes);
    this.timeChanged.emit();
  }


  ngOnDestroy(): void {
  }

}
