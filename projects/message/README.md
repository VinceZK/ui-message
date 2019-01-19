# UI Message
Gracefully reporting messages to users when they are interacting with your system is the key to retain them.

A message can be an error, a warning, a success, or information. 
It's always the main channel your system response to your users. 
UI Message helps you to make errors seem less failure on the user's end and more like cues for adjustment.

UI Message is designed for Node and Angular application, it supports:
1. Separate message data with application code.
2. Support html-based long text.
3. Support multi-language.
4. Use placeholders to embed runtime variables.

![UI-Message Demo](ui-message.png)

## How to Use
1. Install it to your node/angular project:
   ```bash
   $ npm install ui-message --save
   ```
2. In Node
   ```javascript 1.8
   const Message = require('ui-message').Message;
   const MsgFileStore = require('ui-message').MsgFileStore;

   /* Get messages from a file */
   const msgStore = new MsgFileStore(path.join(__dirname, '../../data/message.json'));
   /* Instance a message object(in English) */
   const message = new Message(msgStore, 'EN');

   function logon(req, res) {   
     /* 'LOGON' is the message category; 'USERID_PASSWORD_ERROR' is the message name; 
      * 'E' stands for  error message.
      * Current time is a variable that will replace the placeholder in the text. 
      */
     if (err) return res.json(message.report('LOGON', 'USERID_PASSWORD_ERROR', 'E', currentTime)); 
   }
   ```
   
3. In Angular
   
   Import MessageModule in "app.module.ts":
   ```typescript
   import { BrowserModule } from '@angular/platform-browser';
   import { NgModule } from '@angular/core';
   import { AppComponent } from './app.component';
   import {MessageModule} from 'ui-message-angular';
   @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        MessageModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
   export class AppModule { }
   ```
   In the "SignIn.component.ts", import Message and MessageService:
   ```typescript
    import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
    import {Message, MessageService} from 'ui-message-angular';
    
    @Component({
      selector: 'app-sign-in',
      templateUrl: './sign-in.component.html',
      styleUrls: ['./sign-in.component.css']
    })
    export class SignInComponent implements OnInit, OnDestroy {
      logon(): void {
        this.logonService.logon(this.user.userid, this.user.password).subscribe(
          data => {
            if (data.err) {
              this.messageService.report(<Message>data.err);
            } else  {
              this.user = data.user;
            } 
          }
        );
      }
    }
   ```
   
   Place the message selector somewhere in your HTML template:
   ```html
   ...
   <dk-message></dk-message>
   ...
   ```
   Result of the example: 
![Logon Page Demo](Logon.png)  

### Test
You can git clone the source code and run `npm run start` to run the UI-Message Demo APP as shown above.
### Message Schema
Message schema is defined as following:
```json
  { "msgCat": "SYS",
    "msgName": "SYSTEM_ERROR1",
    "msgText": {
      "EN": {"shortText": "System error 1 happened in %s!", "longText": "Markdown %s2 Text %s1"},
      "ZH": {"shortText": "系统错误1发生在 %s!", "longText": "长文本"}
    }
  }
```
+ "msgCat" stands for message category, which is used to categorize messages.
+ "msgName" is a meaningful name that identify the message in a specific category.
+ "msgText" store message short and long text in different languages.
+ In shortText, you can use placeholder "%s". 
They will be sequentially replaced by the optional arguments provided.
+ In longText, you can use placeholder "%s1, %s2, ...", 
in which the number is used to identify the optional argument position. 
### Implement a Message Store
A message store is used to store messages. It is recommended to use a DB to store your messages.
The default message store "MsgFileStore" is implemented using a JSON file. 
You can use it as a prompt solution. Please refer the message format in `example/message.json` to maintain your own messages.  

If you want to implement your own message store, refer `lib/MsgFileStore.js`. 
You need to implement 3 instance methods:
1. getMessage(msgCat, msgName, langu) /* Return both short and long text */
2. getMessageShortText(msgCat, msgName, langu) /* Return short text only */
3. getMessageLongText(msgCat, msgName, langu) /* Return long text only */

In case your message store prefers async mode, then refer `lib/MsgFileStoreAsync.js`.
### Server Side and Client Side
Messages can either be generated from server side (Node), or from client side(Angular).
No matter how you architecture your application, UI-message gives you the both favors. 

When you import the messageService, you can report messages comes from server 
side directly using `messageService.report(message: Message)`, or `messageService.add(message: Message)` 
if you want to report multiple messages at same time. 

In case messages comes from the client side, for example, a generic data conversion exception,
you already hold your messages in a local array object. Then, you first set the messages array
by calling method `messageService.setMessageStore(msgStore, 'EN')` in the service constructor.
And now you can report your messages freely using method `messageService.reportMessage(msgCat, msgName, msgType, ...args)` and 
`messageService.addMessage(msgCat, msgName, msgType, ...args)`.

Refer the [code example](https://github.com/VinceZK/ui-message/blob/master/src/app/app.component.ts).

## License
[The MIT License](http://opensource.org/licenses/MIT)
