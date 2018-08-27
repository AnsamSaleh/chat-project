import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message : string;
  @ViewChild('f') form: any;
  constructor(private el: ElementRef, private chat: ChatService) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup')


  }
  onSubmit() {
    if(this.form.valid) {
      console.log('values ', this.form.value);
      this.form.reset();

    }
  }
  send() {
    this.chat.sendMessage(this.message);
  }

}
