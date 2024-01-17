import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsletterService } from 'src/app/modules/shared/services/newsletter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  simulateHover: boolean = false;
  showSidebar: boolean = false;

  newsletterForm: FormGroup;
  submitButtonClick: boolean = false
  signedToNewsletter:boolean = false
  constructor(private router: Router, private fb: FormBuilder, private newsletterService: NewsletterService) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {


    setInterval(() => {
      this.simulateHover = true;
      setTimeout(() => {
        this.simulateHover = false;
      }, 2000);

    }, 10000);
  }

  getUrl() {
    return `../../../../../assets/background2.jpg`
  }

  navigateToReview() {
    // Navigate to the /review route when the button is clicked
    this.router.navigate(['/reviews']);
  }

  openSidebar() {
    this.submitButtonClick = false
    this.signedToNewsletter = false
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.showSidebar = true;
  }

  closeSidebar() {
    this.showSidebar = false;
  }

  onSubmit(): void {

    this.submitButtonClick = true
    if (this.newsletterForm.valid) {
      this.newsletterService.signToNewsletter(this.newsletterForm.value.email).subscribe(res => {
        this.signedToNewsletter = true
      })
    }
  }

  prepareTooltip(type: string): string {
    let tip: string = ''
    console.log(type)
    switch (type) {
      case 'email':
        const emailControl = this.newsletterForm.get('email');
        if (emailControl?.value === '' && this.submitButtonClick) {
          tip += "Adres email wymagany"
        } else if(emailControl?.hasError('email')) {
          tip += "Adres email powinien posiadać @"
        }
        break;
    }
    return tip
  }

  hasError(name : string) {
    const control = this.newsletterForm.get(name);
    
    return this.submitButtonClick && control?.invalid;
  }

}
