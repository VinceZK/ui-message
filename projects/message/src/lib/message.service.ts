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
  private msgTypePattern = 'SWEIX';
  private msgStore = [];
  private langu = 'EN';

  constructor() {}

  getObservable(): Observable<Message[]> {
     return this.messageSource.asObservable();
  }

  /**
   * Tell the message service what is the message storage(array) and language
   * msgStore: an Array that stores all messages in a session
   * {string} the language preferred in the session
   */
  setMessageStore(msgStore:any, langu:string) {
    this.msgStore = msgStore;
    this.langu = langu;
  }

  /**
   * Add a message object into a message list
   * {Message} message
   */
  add(message: Message) {
    if(!message) return;
    this.messages.push(message);
    this.messageSource.next(this.messages);
  }

  /**
   * Report only one message at a time
   */
  report(message: Message) {
    if(!message) return;
    this.messages = [];
    this.messages.push(message);
    this.messageSource.next(this.messages);
  }

  /**
   * Report a message at a time based on msgCat, msgName, msgType
   * It is usually used for messages generated in client side(Angular)
   * msgCat
   * msgName
   * msgType
   * {string} args
   */
  reportMessage(msgCat, msgName, msgType, ...args:string[]) {
    this.report(this.generateMessage(msgCat, msgName, msgType, ...args));
  }

  /**
   * Add a message to a list based on msgCat, msgName, msgType
   * It is usually used for messages generated in client side(Angular)
   * msgCat
   * msgName
   * msgType
   * {string} args
   */
  addMessage(msgCat, msgName, msgType, ...args:string[]) {
    this.add(this.generateMessage(msgCat, msgName, msgType, ...args));
  }

  /**
   * Clear all the messages in the container(show in the UI)
   */
  clearMessages() {
    this.messages = [];
    this.messageSource.next(this.messages);
  }

  /**
   * Remove a message from the list by its index(position)
   * idx
   */
  removeMessage(idx) {
    this.messages.splice(idx, 1);
  }

  /**
   * Generate a message object based on msgCat, msgName, msgType from the message store array
   * The message store array is generated in client side.
   * It supports variable parameters for the placeholders' replacement in short and long texts.
   */
  generateMessage(msgCat, msgName, msgType, ...args: string[]){
    this.checkInputParameters(msgCat, msgName, msgType);

    let message = this.msgStore.find(function(message){
      return message.msgCat === msgCat && message.msgName === msgName;
    });

    if (message){
      let msg = new Message();
      msg.msgCat = message.msgCat;
      msg.msgName = message.msgName;
      msg.msgType = msgType;
      msg.msgShortText =  this.replacePlaceholdersInShortText(
        message.msgText[this.langu]? message.msgText[this.langu].shortText: message.msgText['EN'].shortText, args);
      msg.msgLongText =  this.replacePlaceholdersInLongText(
        message.msgText[this.langu]? message.msgText[this.langu].longText: message.msgText['EN'].longText, args);
      return msg;
    } else {
      return null;
    }
  }

  private checkInputParameters(msgCat, msgName, msgType) {
    if(!msgCat) throw new Error('Message Category is missing!');
    if(!msgName) throw new Error('Message Name is missing');
    if(this.msgTypePattern.search(msgType) === -1) throw new Error('Message Type is invalid!');
  }

  private replacePlaceholdersInShortText(text, args) {
    let i = -1;
    return text.replace(/%s/g, function() {
      i++;
      return ((args[i] === undefined)? '':args[i]);
    });
  }

  private replacePlaceholdersInLongText(text, args) {
    return text.replace(/(%s)([1-99])/g, function(match, p1, p2) {
      let i = -1 + parseInt(p2);
      return ((args[i] === undefined)? '':args[i]);
    });
  }
}

