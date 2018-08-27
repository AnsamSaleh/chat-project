import {Component, OnChanges, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {AngularFireList} from 'angularfire2/database';
import {ChatMessage} from '../../models/chat-message';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: Observable<ChatMessage[]>;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.feed = this.chat.getMessages();
  }
  ngOnChanges() {
    this.feed = this.chat.getMessages();
  }

}
