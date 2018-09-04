import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  results: User[];
  loading = true;
  name: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.users = this.auth.getUsers();
  }
  updateResults(results: User[]): void {
    this.results = results;
  }

}
