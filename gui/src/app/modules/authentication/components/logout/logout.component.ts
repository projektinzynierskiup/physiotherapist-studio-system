import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/modules/shared/models/user.model';
import { AppState } from 'src/app/store/app.states';
import { Login, Logout } from '../../store/authentication.actions';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {


  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(new Logout())
  }

  ngOnDestroy(): void {
    
  }
}