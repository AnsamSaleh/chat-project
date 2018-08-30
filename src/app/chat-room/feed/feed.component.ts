import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AngularFireList} from 'angularfire2/database';
import {ChatMessage} from '../../models/chat-message';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<ChatMessage[]>;
  users: Observable<User[]>;

  constructor(private chat: ChatService, private auth: AuthService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages();
    this.users = this.auth.getUser();
  }
  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }

}
