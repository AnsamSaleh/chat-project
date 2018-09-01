import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {
  users: Observable<User[]>;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.users = this.auth.getUsers();
  }
  ngOnChanges() {
    this.users = this.auth.getUsers();
  }

}
