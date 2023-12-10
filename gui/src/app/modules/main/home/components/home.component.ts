import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  simulateHover: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {


    setInterval(() => {
      this.simulateHover = true;
      setTimeout(() => {
        this.simulateHover = false;
      }, 2000);

    }, 10000);
  }


  navigateToReview() {
    // Navigate to the /review route when the button is clicked
    this.router.navigate(['/reviews']);
  }
}
