export class Upload {

  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  timeSent: string;

  constructor(file: File) {
    this.file = file;
  }
}
