/**
 * Created by VinceZK on 5/27/18.
 * Used to process business or UI level message
 * msgCat: message category
 * msgName: message short name
 * msgType: 'S'=Succeeded, 'W'=Warning, 'E'=Error, 'I'=Information, 'X'=Exception
 * msgText: multi-language message texts(short and long)
 * arg1~argn: message arguments used to replace the placeholders in msgText
 */
export {Message};
const msgTypePattern = 'SWEIX';

function Message(msgStore, langu){
    this.msgStore = msgStore;
    this.langu = langu;
}

/**
 * Report a message (both short text and long text)
 * @param msgCat
 * @param msgName
 * @param msgType
 * @param callback
 * @returns `{"msgCat": "SYS",
 *            "msgName": "SYSTEM_ERROR1",
 *            "msgType": "E",
 *            "msgShortText": "System error 1 happened in %s!"
 *            "msgLongText": "<h5>xxx</h5>"}`
 */
Message.prototype.report = function(msgCat, msgName, msgType, callback){
  _checkInputParameters(msgCat, msgName, msgType);
  const args = arguments;
  if(this.msgStore.storeMode === 'Sync'){
    let message = this.msgStore.getMessage(msgCat, msgName, this.langu);
    if (!message){
      return null;
    }
    message.msgType = msgType;
    message.msgShortText =  _replacePlaceholdersInShortText(message.msgShortText, args, 2);
    message.msgLongText =  _replacePlaceholdersInLongText(message.msgLongText, args, 2);
    return message;
  } else {  // Async
    this.msgStore.getMessageShortText(msgCat, msgName, this.langu, (message)=>{
      if(message){
        message.msgType = msgType;
        message.msgShortText =  _replacePlaceholdersInShortText(message.msgShortText, args, 3);
        message.msgLongText =  _replacePlaceholdersInLongText(message.msgLongText, args, 3);
        callback(message);
      }else{
        callback(null);
      }
    })
  }
};

/**
 * Report a message short text
 * @param msgCat
 * @param msgName
 * @param msgType
 * @param callback
 * @returns `{"msgCat": "SYS",
 *            "msgName": "SYSTEM_ERROR1",
 *            "msgType": "E",
 *            "msgShortText": "System error 1 happened in %s!"}`
 */
Message.prototype.reportShortText = function(msgCat, msgName, msgType, callback){
    _checkInputParameters(msgCat, msgName, msgType);
    const args = arguments;
    if(this.msgStore.storeMode === 'Sync'){
        let message = this.msgStore.getMessageShortText(msgCat, msgName, this.langu);
        if (!message){
            return null;
        }
        message.msgType = msgType;
        message.msgShortText =  _replacePlaceholdersInShortText(message.msgShortText, args, 2);
        return message;
    } else {  // Async
        this.msgStore.getMessageShortText(msgCat, msgName, this.langu, (message)=>{
            if(message){
                message.msgType = msgType;
                message.msgShortText =  _replacePlaceholdersInShortText(message.msgShortText, args, 3);
                callback(message);
            }else{
                callback(null);
            }
        })
    }
};

/**
 * Report a message long text
 * @param msgCat
 * @param msgName
 * @param msgType
 * @param callback
 * @returns `{"msgCat": "SYS",
 *            "msgName": "SYSTEM_ERROR1",
 *            "msgType": "E",
 *            "msgLongText": "Markdown Text %s!"}`
 */
//TODO store and display in markdown text
Message.prototype.reportLongText = function(msgCat, msgName, msgType, callback){
    _checkInputParameters(msgCat, msgName, msgType);
    const args = arguments;
    if(this.msgStore.storeMode === 'Sync'){
        let message = this.msgStore.getMessageLongText(msgCat, msgName, this.langu);
        if (!message){
            return null;
        }
        message.msgType = msgType;
        message.msgLongText =  _replacePlaceholdersInLongText(message.msgLongText, args, 2);
        return message;
    } else {  // Async
        this.msgStore.getMessageLongText(msgCat, msgName, this.langu, (message)=>{
            if(message){
                message.msgType = msgType;
                message.msgLongText =  _replacePlaceholdersInLongText(message.msgLongText, args, 3);
                callback(message);
            }else{
                callback(null);
            }

        })
    }
};

function _checkInputParameters(msgCat, msgName, msgType) {
    if(!msgCat) throw new Error('Message Category is missing!');
    if(!msgName) throw new Error('Message Name is missing');
    if(msgTypePattern.search(msgType) === -1) throw new Error('Message Type is invalid!');
}

function _replacePlaceholdersInShortText(text, args, pos) {
    let i = pos;
    return text.replace(/%s/g, function() {
        i++;
        return ((args[i] === undefined)? '':args[i]);
    });
}

function _replacePlaceholdersInLongText(text, args, pos) {
    return text.replace(/(%s)([1-99])/g, function(match, p1, p2) {
        let i = pos + parseInt(p2);
        return ((args[i] === undefined)? '':args[i]);
    });
}
