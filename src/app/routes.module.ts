import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ChatRoomComponent} from './chat-room/chat-room.component';
import {LoginGuard} from './login.guard';

const routes: Routes = [
  // basic routes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'chat', component: ChatRoomComponent, canActivate: [ LoginGuard ] },
  //{ path: 'user/:id', component: ChatRoomComponent },
  {path: '**', component: LogInComponent}
];

export default RouterModule.forRoot(routes);
