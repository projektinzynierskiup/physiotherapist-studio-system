import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appTimeInputMask]',
})
export class TimeInputDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: { target: { value: any; }; }) {
    this.onInputChange(event.target.value, true);
  }
  

  onInputChange(event: string, backspace: boolean) {
    let newVal = event.replace(/\D/g, '');
    
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1');
    } else {
      newVal = newVal.substring(0, 2);
      newVal = newVal.replace(/^(\d{0,1})(\d{0,1})/, '$1 $2');
    }
    this.ngControl?.valueAccessor?.writeValue(newVal);
  }
}
