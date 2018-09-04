import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import * as firebase from 'firebase';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {
 // user: firebase.User;
  id: string;
  email: string;
  users: User[];

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.id = this.auth.userID;
    this.email = this.auth.userEmail;
    console.log('id init' + this.id);
    //this.users = this.auth.getUser();
  }
  ngDoCheck() {
    this.id = this.auth.userID;
    this.email = this.auth.userEmail;
    console.log('id change' + this.id);
/*
    this.auth.getUser()
      .subscribe(
        (results: User[]) => {
        //  console.log('results ', results);
          this.users = results;
        },
        (err: any) => { // on error
          console.log(err);
        }
      );
*/
  }

  logout() {
    this.auth.logout();
  }
  getUser(users: User[]): void {
    setTimeout(this.users = users ,4000);
    console.log('ansam'+ users[0].userName);
  }

}
