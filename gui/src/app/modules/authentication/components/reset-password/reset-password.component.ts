import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  // Declare a variable to store the parameter
  uuid?: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to the route parameters to get the value
    this.route.params.subscribe(params => {
      this.uuid = params['uuid']; // 'id' should match the parameter name in the route
      // Now, this.userId will have the value from the URL
      console.log(this.uuid)
    });
  }
}
