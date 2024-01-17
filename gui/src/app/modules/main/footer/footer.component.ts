import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from '../../shared/models/navbar.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AuthorizationService } from '../../authentication/services/authorization.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { selectIsAuthenticated } from '../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {


  constructor(
    private router: Router,
    private store: Store<AppState>,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }


}
