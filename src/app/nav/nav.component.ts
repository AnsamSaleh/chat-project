import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {
  user: firebase.User;
  id: string;
  users: Observable<User[]>;
  name: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.id = this.auth.userID;
    console.log(this.id);
    this.users = this.auth.getUser();
  }
  ngDoCheck() {
    this.id = this.auth.userID;
    console.log(this.id);
    this.users = this.auth.getUser();
    this.auth.getName();
  }

  logout() {
    this.auth.logout();
  }

}
