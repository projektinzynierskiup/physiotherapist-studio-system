import { Directive, HostListener } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
    selector: '[formControlName][appNumberInputMask]',
  })
  export class NumberInputDirective {
  
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
        // Allow only numbers and backspace
        const newValue = backspace ? event : event.replace(/[^0-9]/g, '');
    
        // Check if the value has changed before updating
        if (newValue !== this.ngControl.value) {
          // Update the input value
          this.ngControl.control?.setValue(newValue);
        }
      }
  }
  