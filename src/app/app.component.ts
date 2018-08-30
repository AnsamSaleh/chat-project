import {Component, DoCheck, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import * as firebase from 'firebase/app';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  user: firebase.User;
  id: string;
  users: Observable<User[]>;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.id = this.auth.userID;
    console.log(this.id);
  }
  ngDoCheck() {
    this.id = this.auth.userID;
    console.log(this.id);
    this.users = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }

}
