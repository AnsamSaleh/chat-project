import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import {AuthService} from '../services/auth.service';
import {UploadService} from '../services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  visible = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {}
  openPop() {
    this.visible = !this.visible;
  }
  closePop() {
    this.visible = false;
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  imageLoaded() {
    this.auth.uploadImage(this.croppedImage);
  }
  loadImageFailed() {
    // show message
  }
}
