import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import * from 'jquery';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {UploadService} from '../../services/upload.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit, DoCheck {
  @Input() userName: string;
  message = '';
  @ViewChild('f') form: any;
  fileURL: File;
  hidden = true;

  constructor(private chat: ChatService, public auth: AuthService, public upload: UploadService) {}

  ngOnInit() {
    $(document).ready(function() {
      $("#emoji").emojioneArea({
        pickerPosition: "top",
        tonesStyle: "bullet",
      });
    }
  }
  ngDoCheck() {
    if ($('#emoji').val() !== '') {
      this.hidden = false;
    }
  }

  send() {
    const x = $('#emoji').val();
    this.message = x;
    if (this.message !== '') {
      this.chat.sendMessage(this.message, this.userName);
      this.form.reset();
      $('#emoji').val('');
      $('.emojionearea-editor').text('');
    }
  }

  uploadFile(event) {

    this.upload.pushUpload(event);
   // $('.emojionearea-editor').text(this.fileURL);
 //   this.chat.uploadFile(this.fileURL, this.userName);

  }
}
