import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  @ViewChild('form') form: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(private auth: AuthService) { }

  ngOnInit() {}

  signUp() {
    if (this.form.valid) {
      this.auth.signUp(this.croppedImage, this.username, this.email, this.password);
      this.form.reset();
    } else {
      console.log('Invalid Form ');
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
  }
  loadImageFailed() {
    // show message
  }

}
