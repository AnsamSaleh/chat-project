import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {ChatMessage} from '../models/chat-message';
import {User} from '../models/user';
import * from 'jquery';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scroller') feedContainer: ElementRef;
  user: Observable<User[]>;
  userName: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUsers();
    $(document).ready(function() {
    //  let x = $('.feed').scrollHeight;
      $('.feed').scrollTop(500);
    });
  }
/*
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop
      = this.feedContainer.nativeElement.scrollHeight;
  }
*/

}
