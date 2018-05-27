/**
 * Created by VinceZK on 5/27/18.
 * Get message content from backend persistence (DB, filesystem)
 * This is an example of file system persistence.
 */
import fs from 'fs';
import {find} from 'lodash/collection';
export { MsgFileStoreAsync };

/**
 * Constructor
 * @param file name
 * @constructor
 */
function MsgFileStoreAsync(file) {
    this.msgStore = file;
    this.storeMode = 'Async'; //Sync|Async
}

MsgFileStoreAsync.prototype.getMessageShortText = function(msgCat, msgName, langu, callback) {
    _getMessageFromStore(this.msgStore, msgCat, msgName, langu, 'short', callback);
};

MsgFileStoreAsync.prototype.getMessageLongText = function(msgCat, msgName, langu, callback) {
    _getMessageFromStore(this.msgStore, msgCat, msgName, langu, 'long', callback);
};

function _getMessageFromStore(file, msgCat, msgName, langu, textType, callback) {
    fs.readFile(file, 'utf8', (err, data)=>{
        if(err) throw err;
        let messages = JSON.parse(data);
        let message = find(messages, function(message){
            return message.msgCat === msgCat && message.msgName === msgName;
        });
        if (message){
            if(textType === 'short'){
                callback({
                    msgCat: message.msgCat,
                    msgName: message.msgName,
                    msgShortText: message.msgText[langu]? message.msgText[langu].shortText: message.msgText['EN'].shortText
                })
            }else{
                callback({
                    msgCat: message.msgCat,
                    msgName: message.msgName,
                    msgLongText: message.msgText[langu]? message.msgText[langu].longText: message.msgText['EN'].longText
                })
            }

        } else {
            callback(null);
        }
    })
}
