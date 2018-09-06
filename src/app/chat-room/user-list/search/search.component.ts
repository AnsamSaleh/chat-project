import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {User} from '../../../models/user';
import {debounceTime, filter, map, switchAll, tap} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<User[]> = new EventEmitter<User[]>();
  @Output() name: EventEmitter<string> = new EventEmitter<string>();
  query: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    /*
    this.route.queryParams
      .subscribe((params: any) => {
        this.query = params['query'] || '';
      });
      */
  }

  ngOnInit() {}

  getUsers() {
    this.loading.emit(true);
    this.auth.getUsers()
      .subscribe(
        (users: User[]) => {
          this.loading.emit(false);
          this.results.emit(users);
        });
  }
  submit(): void {
    /*
    // filter photos by albumId
    this.router.navigate(['user'], { queryParams: { query: query } })
      .then(() => {
        this.getUsers();
        this.name.emit(query);
        }
      );
      */
    this.getUsers();
    this.name.emit(this.query);
    console.log('query' + this.query);
  }

}
