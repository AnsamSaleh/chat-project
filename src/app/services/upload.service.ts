import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Upload} from '../models/upload';
import * as firebase from 'firebase';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private path = 'uploads';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private afStorage: AngularFireStorage) {}

  pushUpload(event) {
  //  const storageRef = firebase.storage().ref();
  //  this.uploadTask = storageRef.child(`uploads/${file.name}`).put(file);

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
  //  this.downloadURL = this.ref.getDownloadURL();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          console.log(url); // <-- do what ever you want with the url..
        });
      })
    ).subscribe();
  }


}
