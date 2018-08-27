import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import RoutesModule from './routes.module';
import {FormsModule} from '@angular/forms';
//firebase
import {environment} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { UserListComponent } from './chat-room/user-list/user-list.component';
import { FeedComponent } from './chat-room/feed/feed.component';
import { MessageComponent } from './chat-room/message/message.component';
import { UserItemComponent } from './chat-room/user-item/user-item.component';
import { ChatFormComponent } from './chat-room/chat-form/chat-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    ChatRoomComponent,
    UserListComponent,
    FeedComponent,
    MessageComponent,
    UserItemComponent,
    ChatFormComponent
  ],
  imports: [
    BrowserModule,
    RoutesModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
