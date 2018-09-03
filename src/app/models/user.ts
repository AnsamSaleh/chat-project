export class User {
  id?: string;
  email?: string;
  userName?: string;
  password?: string;
  status?: string;

  constructor(email: string, status: string, userName: string){
    this.email = email;
    this.status = status;
    this.userName = userName;
  }
}
