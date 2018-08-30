import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {ChatMessage} from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: firebase.User;
  chatMessage: ChatMessage;
  chatMessages: AngularFireList<ChatMessage[]>;
  userName: string;

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(dbUser => {
      if (dbUser !== undefined && dbUser !== null) {
        this.user = dbUser;
        this.userName = this.user.displayName;
      }
    });
  }

  getUsers(): Observable<any[]> {
    return this.db.list('users').valueChanges();
  }

  sendMessage(msg: string) {
    const time = this.getTimeStamp();
    const email = this.user.email;
    this.chatMessages = this.db.list('messages');
    this.chatMessage = {
      message: msg,
      timeSent: time,
      userName: this.userName,
      email: email
    };
    this.chatMessages.push(this.chatMessage);
    console.log('send message!');
  }

  getTimeStamp():string {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}` ;
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` ;
    return `${date} ${time}`;
  }

  getMessages(): Observable<ChatMessage[]> {
   return this.db.list('messages').valueChanges();
  }

}
