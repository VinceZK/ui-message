import { Injectable } from '@angular/core';
import {Message} from "./message.model";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messages: Message[] = [];
  private messageSource = new BehaviorSubject<Message[]>([]);

  constructor() { }

  getObservable(): Observable<Message[]> {
     return this.messageSource.asObservable();
  }

  pushMessage(message: Message) {
    this.messages.push(message);
    this.messageSource.next(this.messages);
  }

  /**
   * Report only one message a time
   */
  reportMessage(message: Message) {
    this.messages = [];
    this.messages.push(message);
    this.messageSource.next(this.messages);
  }

  clearMessages() {
    this.messages = [];
    this.messageSource.next(this.messages);
  }

  removeMessage(idx) {
    this.messages.splice(idx, 1);
  }
}

