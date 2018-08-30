import {Component, OnInit, ViewChild} from '@angular/core';
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

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.email, this.password);
      this.form.reset();
    } else {
      console.log('Invalid Form ');
    }

  }

}
