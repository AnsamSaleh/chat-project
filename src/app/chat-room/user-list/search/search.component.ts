import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {User} from '../../../models/user';
import {debounceTime, filter, map, switchAll, tap} from 'rxjs/operators';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private auth: AuthService, private el: ElementRef) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),//e=intered value
        filter((text: string) => text.length > 1),
        debounceTime(250),
        tap(() => this.loading.emit(true)),
        map((name: string) => this.auth.getUsers()),
        switchAll()
      ).subscribe(
      (results: User[]) => {
        console.log('results ', results);
        this.loading.emit(false);
        this.results.emit(results);
      },
      (err: any) => { // on error
        console.log(err);
        this.loading.emit(false);
      },
      () => { // on completion
        this.loading.emit(false);
      }
    );
  }

}
