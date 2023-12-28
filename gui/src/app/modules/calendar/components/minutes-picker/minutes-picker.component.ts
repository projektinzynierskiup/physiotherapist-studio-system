import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-minutes-picker',
  templateUrl: './minutes-picker.component.html',
  styleUrls: ['./minutes-picker.component.scss']
})
export class MinutesPickerComponent implements OnInit {
  @Input() minutes?: number
  minutesStep: number = 5
  @Output() minutesChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }
  
  upMinutes() {
    if(this.minutes != undefined) {
      this.minutes += this.minutesStep
      this.updateMinutes() 
    }
  }

  downMinutes() {
    if(this.minutes != undefined && this.minutes - this.minutesStep >= 0) {
      this.minutes -= this.minutesStep
      this.updateMinutes() 
    }
  }

  updateMinutes() {
    this.minutesChange.emit(this.minutes);
  }
}
