export class User {
  id?: string;
  email?: string;
  userName?: string;
  password?: string;
  status?: string;
  imageSrc?: string;

  constructor(imageSrc: string, email: string, status: string, userName: string){
    this.imageSrc = imageSrc;
    this.email = email;
    this.status = status;
    this.userName = userName;
  }
}
