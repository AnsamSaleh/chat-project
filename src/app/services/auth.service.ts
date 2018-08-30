import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {User} from '../models/user';
import {ChatMessage} from '../models/chat-message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  private authState: any;
  userID: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

  logout() {
   // this.userRef.remove()
   //   .catch(error => console.log(error));
    const out = this.afAuth.auth.signOut();
    const status = 'offLine';
    this.setUserStatus(status);
    this.router.navigate(['/login']);
    return out;
  }


  signUp(username: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then ( user => {
        console.log(username, email, password);
        this.authState = user;
        console.log(this.authState);
        const status = 'onLine';
        this.userID = this.authState.user.uid;
        this.setUserData(username, email, status);
        this.router.navigate(['/chat']);
      }).catch(err => {
      console.log(err);
      this.router.navigate(['/signup']);
    });
  }
  setUserData(username: string, email: string, status: string) {
    const path = `uers/${this.userID}`;
    console.log(path);
    const data = {
      username: username,
      email: email,
      status: status
    }
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then ( resolve => {
        console.log(email, password);
        this.authState = resolve;
        this.userID = resolve.user.uid;
        const status = 'onLine';
        console.log(resolve);
        console.log(this.userID);
        this.setUserStatus(status);
        this.router.navigate(['/chat']);
      }).catch(err => {
      console.log(err);
      this.router.navigate(['/login']);
    });
  }

  setUserStatus(status: string) {
    const path = `uers/${this.userID}`;
    const data = {
      status: status
    }
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  getUser(): Observable<User[]> {
    const path = `uers/${this.userID}`;
    return this.db.list(path).valueChanges();
  }
}
