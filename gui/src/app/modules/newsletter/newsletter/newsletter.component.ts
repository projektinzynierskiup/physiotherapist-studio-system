import { Component } from '@angular/core';
import { NewsletterService } from '../../shared/services/newsletter.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent {

  inputItemFormControl: FormControl;

  constructor(
    private newsletterService: NewsletterService,
  ){
    this.inputItemFormControl = new FormControl('', [Validators.required, Validators.email]);
  }

  signInToNewsletter() {
    this.newsletterService.signToNewsletter(this.inputItemFormControl.value).subscribe();
  }


}
