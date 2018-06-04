import { Component } from '@angular/core';
import {Message} from 'message';
import {MessageService} from 'message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private messageService : MessageService){}

  addMessage(msgType) {
    let message = new Message;
    message.msgCat = 'APP';
    message.msgName = 'TEST';
    message.msgType = msgType;
    message.msgShortText = 'Test Short Message';
    message.msgLongText = `<h3>Test Long Message with HTML format</h3>`;

    this.messageService.pushMessage(message);
  }

  clearMessages() {
    this.messageService.clearMessages();
  }
}
