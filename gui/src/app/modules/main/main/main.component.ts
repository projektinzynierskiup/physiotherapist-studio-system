import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { AppState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../authentication/store/authentication.actions';
import { SharedService } from '../../shared/services/shared.service';
import { Subscription } from 'rxjs';
import { selectIsAuthenticated } from '../../authentication/store/authentication.selectors';
import { getOffer } from '../home/store/home.actions';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  isAuthenticatedSubscription?: Subscription

  isAuthenticated?: boolean

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {

    this.isAuthenticatedSubscription = this.store.select(selectIsAuthenticated).subscribe(res => {
      this.isAuthenticated = res
    })

    this.store.dispatch(getOffer())
    
    this.restoreSession()
    
    this.router.navigate(['/home']);
  }

  restoreSession() {
    const token = this.authenticationService.getToken()
    if(this.isAuthenticated && token) {
      this.store.dispatch(loginSuccess({
        token: token,
        userData: this.sharedService.getModifyToken(token)
      }))
    } else {
      localStorage.setItem('role', 'GUEST');
    }
  }

  ngOnDestroy(): void {
    if(this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe()
  }
}
