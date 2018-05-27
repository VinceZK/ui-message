# UI Message
Report messages to the user when he is interacting with a software system. 
A message can be an error, a warning, or an information. 

## Example
```javascript
let message = new Message(msgStore, 'EN');
message.reportShortText('APP', 'APPLICATION_ERROR1','E', 'HELL', 'HEAVEN');
// return a short message text: "Application error 1 happened in HELL and HEAVEN!"
```

## License
[The MIT License](http://opensource.org/licenses/MIT)