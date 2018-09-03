import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Upload} from '../models/upload';
import * as firebase from 'firebase';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  /*
  task: AngularFireUploadTask;//main task
  percentage: Observable<number>;//progress monitoring
  snapshot: Observable<any>;//progress monitoring
  downloadURL: Observable<any>;
  isHovering: boolean;//dropzone css toggling

  constructor(private storge: AngularFireStorage) { }

  toggleHover( event: boolean) {
    this.isHovering = !this.isHovering;
  }
  startUplod(event: FileList ) {
    //file Object
    const file = event.item(0);
    const path = this.db.list(`uploads`);
    const customMetadata = {app: 'my angular fire'}
    this.task = this.storge.upload(path, file, {customMetadata});
    //progress
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    //download url
   // this.downloadURL = this.task.downloadURL();
  }
  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;

  }
   */
  private path = 'uploads';
  private uploadTask: firebase.storage.UploadTask;
  constructor(private db: AngularFireDatabase) {}

  pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    this.uploadTask = storageRef.child(`uploads/${upload.file.name}`).put(upload.file);

    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // upload in progress
       // upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        upload.timeSent = this.getTimeStamp();
        console.log('upload ', upload.progress, upload.url, upload.name, upload.timeSent);
        this.saveFileData(upload);
      }
    );
  }
  saveFileData(upload: Upload) {
    this.db.list(`uploads`).push(upload);
  }
  getTimeStamp(): string {
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}` ;
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` ;
    return `${date} ${time}`;
  }

}
