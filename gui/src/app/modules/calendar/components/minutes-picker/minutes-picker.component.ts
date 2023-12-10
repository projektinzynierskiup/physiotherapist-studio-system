import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-minutes-picker',
  templateUrl: './minutes-picker.component.html',
  styleUrls: ['./minutes-picker.component.scss']
})
export class MinutesPickerComponent implements OnInit {
  @Input() minutes?: number
  minutesStep: number = 5

  ngOnInit(): void {
  }
  
  upMinutes() {
    if(this.minutes != undefined && this.minutes + this.minutesStep < 60) {
      this.minutes += this.minutesStep
    } else if(this.minutes != undefined  && this.minutes + this.minutesStep >= 60)  {
      this.minutes = 0
    }
  }

  downMinutes() {
    if(this.minutes != undefined && this.minutes - this.minutesStep >= 0) {
      this.minutes -= this.minutesStep
    } else if(this.minutes != undefined  && this.minutes == 0)  {
      this.minutes = 60 - this.minutesStep
    }
  }
}
