import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-cancel-newsletter',
  templateUrl: './cancel-newsletter.component.html',
  styleUrls: ['./cancel-newsletter.component.scss']
})
export class CancelNewsletterComponent implements OnInit {
  uuid?: string;
  signedOutCorrectly?: boolean

  constructor(private route: ActivatedRoute, private newsletterService: NewsletterService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']; 
    });

  }

  cancelNewsletter() {
    this.newsletterService.cancelNewsletter(this.uuid).subscribe(
        (res: any) => {
          console.log(res);
          this.signedOutCorrectly = true;
        },
        (error: any) => {
          console.error(error);
          this.signedOutCorrectly = false;
        }
      )
  }

  
  goToHome() {
    this.router.navigateByUrl('/home');
  }

  getBackground() {
    return `../../../../assets/background3.jpg`
  }
}
