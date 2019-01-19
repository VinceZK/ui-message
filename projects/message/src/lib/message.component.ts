import { Component, OnInit } from '@angular/core';
import {Message, messageType} from "./message.model";
import {MessageService} from "./message.service";

@Component({
  selector: 'dk-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getObservable().subscribe(messages => this.messages = messages)
  }

  getMessageDisplayClass(msgType: messageType): string {
    switch (msgType) {
      case messageType.Error: {
        return 'alert-danger';
      }
      case messageType.Warning: {
        return  'alert-warning';
      }
      case messageType.Success: {
        return 'alert-success';
      }
      case messageType.Information: {
        return 'alert-info';
      }
      case messageType.Exception: {
        return 'alert-danger';
      }
      default: {
        return 'alert-secondary';
      }
    }
  }

  getCardDisplayClass(msgType: messageType): string {
    switch (msgType) {
      case messageType.Error: {
        return 'card-danger';
      }
      case messageType.Warning: {
        return  'card-warning';
      }
      case messageType.Success: {
        return 'card-success';
      }
      case messageType.Information: {
        return 'card-info';
      }
      case messageType.Exception: {
        return 'card-danger';
      }
      default: {
        return '';
      }
    }
  }

  removeMessage(idx: number) {
    this.messageService.removeMessage(idx);
  }

  toggleShowLongText(idx: number) {
    if(this.messages[idx].showLongText) {
      this.messages[idx].showLongText = false;
    }else{
      this.messages.forEach(message => message.showLongText = false );
      this.messages[idx].showLongText = true;
    }
    return false; // To forbid page refresh when clicking the link
  }
}
