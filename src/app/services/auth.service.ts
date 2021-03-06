import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {User} from '../models/user';
import {ChatMessage} from '../models/chat-message';
import {debounceTime, find, map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: firebase.User;
  authState: any;
  userID: string;
  userEmail: string;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

  logout() {
    const out = this.afAuth.auth.signOut();
    const status = 'offLine';
    this.setUserStatus(status);
    this.router.navigate(['/login']);
    return out;
  }


  signUp(imageSrc: string, username: string, email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then ( user => {
        console.log(imageSrc, username, email, password);
        this.authState = user;
        console.log(this.authState);
        const status = 'onLine';
        this.userEmail = email;
        this.userID = this.authState.user.uid;
        this.setUserData(imageSrc, username, email, status);
        this.router.navigate(['/chat']);
      }).catch(err => {
      console.log(err);
      this.router.navigate(['/signup']);
    });
  }
  setUserData(imageSrc: string, username: string, email: string, status: string) {
    const path = `uers/${this.userID}`;
    console.log(path);
    const data = {
      imageSrc: imageSrc,
      userName: username,
      email: email,
      status: status
    };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then ( resolve => {
        console.log(email, password);
        this.authState = resolve;
        this.userID = this.authState.user.uid;
        const status = 'onLine';
        this.userEmail = email;
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
  uploadImage(imageSrc: string) {
    const path = `uers/${this.userID}`;
    const data = {
      imageSrc: imageSrc
    }
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  getUser(): Observable<User[]> {
    const path = `uers/${this.userID}`;
    return this.db.list(path).valueChanges()
    .pipe(
        map(response => {
          return <any>response
            .map(item => {
              //  console.log("raw item", item); // uncomment if you want to debug
              return new User(item.imageSrc, item.email, item.status, item.userName);
            });
        })
      );
  }
  getUsers(): Observable<User[]> {
    return this.db.list(`uers`).valueChanges()
      .pipe(
        map(response => {
          return <any>response
            .map(item => {
              //  console.log("raw item", item); // uncomment if you want to debug
              return new User(item.imageSrc, item.email, item.status, item.userName);
            });
        })
      );
  }
}
