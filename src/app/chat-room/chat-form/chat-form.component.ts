import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, range} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {Upload} from '../../models/upload';
import {UploadService} from '../../services/upload.service';
import {AngularFireUploadTask} from 'angularfire2/storage';
import * from 'jquery';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  @ViewChild('f') form: any;
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor(private chat: ChatService, public upload: UploadService) {

  }

  ngOnInit() {
    $(document).ready(function() {
      $('#emoji').emojioneArea({
        pickerPosition: "bottom",
        inline: true
      });
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('values ', this.form.value);
      this.form.reset();
    }
  }
  send() {
    if (this.message === '') {
      this.chat.sendMessage(this.message);
    } else {
      this.uploadSingle();
    }
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this.upload.pushUpload(this.currentUpload);
  }
}
