import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import * from 'jquery';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message = '';
  @ViewChild('f') form: any;
  fileURL: string;
  hidden = true;

  constructor(private chat: ChatService, public auth: AuthService) {}

  ngOnInit() {
    $(document).ready(function() {
      $("#emoji").emojioneArea({
        pickerPosition: "top",
        tonesStyle: "bullet",

      });
    }
  }
  onSubmit() {}

  send() {
    const x = $('#emoji').val();
    this.message = x;
    //console.log('n mmmmm'  + this.message);
    if (this.message !== '') {
      this.chat.sendMessage(this.message);
    } else {
      this.uploadFile();
    }
    this.form.reset();
    $('#emoji').val('');
  }

  uploadFile() {
    this.chat.uploadFile(this.fileURL);
  }
}
