/**
 * Created by VinceZK on 5/27/18.
 * Get message content from backend persistence (DB, filesystem)
 * This is an example of file system persistence.
 */
import fs from 'fs';
import {find} from 'lodash/collection';
export { MsgFileStore };

/**
 * Constructor
 * @param file name
 * @constructor
 */
function MsgFileStore(file) {
    this.msgStore = _Connect(file);
    this.storeMode = 'Sync'; //Sync|Async
}

MsgFileStore.prototype.getMessage = function(msgCat, msgName, langu) {
  let message = find(this.msgStore, function(message){
    return message.msgCat === msgCat && message.msgName === msgName;
  });

  if (message){
    return {
      msgCat: message.msgCat,
      msgName: message.msgName,
      msgShortText: message.msgText[langu]? message.msgText[langu].shortText: message.msgText['EN'].shortText,
      msgLongText: message.msgText[langu]? message.msgText[langu].longText: message.msgText['EN'].longText
    }
  } else {
    return null;
  }
};

MsgFileStore.prototype.getMessageShortText = function(msgCat, msgName, langu) {
    let message = find(this.msgStore, function(message){
      return message.msgCat === msgCat && message.msgName === msgName;
    });

    if (message){
        return {
            msgCat: message.msgCat,
            msgName: message.msgName,
            msgShortText: message.msgText[langu]? message.msgText[langu].shortText: message.msgText['EN'].shortText
        }
    } else {
        return null;
    }
};

MsgFileStore.prototype.getMessageLongText = function(msgCat, msgName, langu) {
    let message = find(this.msgStore, function(message){
        return message.msgCat === msgCat && message.msgName === msgName;
    });

    if (message){
        return {
            msgCat: message.msgCat,
            msgName: message.msgName,
            msgLongText: message.msgText[langu]? message.msgText[langu].longText: message.msgText['EN'].longText
        }
    } else {
        return null;
    }
};

function _Connect(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}
