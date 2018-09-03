import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  email: string;
  password: string;
  @ViewChild('form') form: any;
  @Output() users: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.email, this.password);
      this.auth.getUser().subscribe(
        (results: User[]) => {
          console.log('results ', results);
          this.users.emit(results);
        },
        (err: any) => { // on error
          console.log(err);
        },
        () => { // on completion
          this.form.reset();
        });

    } else {
      console.log('Invalid Form ');
    }

  }

}
