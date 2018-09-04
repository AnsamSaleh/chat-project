export class ChatMessage {
  key?: string;
  email?: string;
  userName?: string;
  message?: string;
  file?: string;
  timeSent?: Date = new Date();
}
