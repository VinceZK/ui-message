/**
 * Created by VinceZK on 6/10/18.
 * Get message content from backend persistence (DB, filesystem)
 * This is an array store that may be useful in browser context.
 */
export { MsgArrayStore };

/**
 * Constructor
 * @param an array that has all the messages
 * @constructor
 */
function MsgArrayStore(msgArray) {
    this.msgStore = msgArray;
    this.storeMode = 'Sync'; //Sync|Async
}

MsgArrayStore.prototype.getMessage = function(msgCat, msgName, langu) {
  let message = this.msgStore.find(function(message){
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

MsgArrayStore.prototype.getMessageShortText = function(msgCat, msgName, langu) {
    let message = this.msgStore.find(function(message){
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

MsgArrayStore.prototype.getMessageLongText = function(msgCat, msgName, langu) {
    let message = this.msgStore.find(function(message){
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
