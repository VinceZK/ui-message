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
    message.msgLongText = `
<h5>Symptom</h5>
<p>You are not authorized to execute this operation</p>
<h5>Reason</h5>
<p>This may due to you are not granted with proper permission</p>
<h5>Solution</h5>
<p>Contact your system support to get the permission, or you can add permission of this operation through this <a href="#">APP</a></p>`;

    this.messageService.pushMessage(message);
  }

  clearMessages() {
    this.messageService.clearMessages();
  }
}
