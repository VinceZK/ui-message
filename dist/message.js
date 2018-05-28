'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by VinceZK on 5/27/18.
 * Used to process business or UI level message
 * msgCat: message category
 * msgName: message short name
 * msgType: 'S'=Succeeded, 'W'=Warning, 'E'=Error, 'I'=Information, 'X'=Exception
 * msgText: multi-language message texts(short and long)
 * arg1~argn: message arguments used to replace the placeholders in msgText
 */
exports.Message = Message;

var msgTypePattern = 'SWEIX';

function Message(msgStore, langu) {
    this.msgStore = msgStore;
    this.langu = langu;
}

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
Message.prototype.reportShortText = function (msgCat, msgName, msgType, callback) {
    _checkInputParameters(msgCat, msgName, msgType);
    var args = arguments;
    if (this.msgStore.storeMode === 'Sync') {
        var message = this.msgStore.getMessageShortText(msgCat, msgName, this.langu);
        if (!message) {
            return null;
        }
        message.msgType = msgType;
        message.msgShortText = _replacePlaceholdersInShortText(message.msgShortText, args, 2);
        return message;
    } else {
        // Async
        this.msgStore.getMessageShortText(msgCat, msgName, this.langu, function (message) {
            if (message) {
                message.msgType = msgType;
                message.msgShortText = _replacePlaceholdersInShortText(message.msgShortText, args, 3);
                callback(message);
            } else {
                callback(null);
            }
        });
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
Message.prototype.reportLongText = function (msgCat, msgName, msgType, callback) {
    _checkInputParameters(msgCat, msgName, msgType);
    var args = arguments;
    if (this.msgStore.storeMode === 'Sync') {
        var message = this.msgStore.getMessageLongText(msgCat, msgName, this.langu);
        if (!message) {
            return null;
        }
        message.msgType = msgType;
        message.msgLongText = _replacePlaceholdersInLongText(message.msgLongText, args, 2);
        return message;
    } else {
        // Async
        this.msgStore.getMessageLongText(msgCat, msgName, this.langu, function (message) {
            if (message) {
                message.msgType = msgType;
                message.msgLongText = _replacePlaceholdersInLongText(message.msgLongText, args, 3);
                callback(message);
            } else {
                callback(null);
            }
        });
    }
};

function _checkInputParameters(msgCat, msgName, msgType) {
    if (!msgCat) throw new Error('Message Category is missing!');
    if (!msgName) throw new Error('Message Name is missing');
    if (msgTypePattern.search(msgType) === -1) throw new Error('Message Type is invalid!');
}

function _replacePlaceholdersInShortText(text, args, pos) {
    var i = pos;
    return text.replace(/%s/g, function () {
        i++;
        return args[i] === undefined ? '' : args[i];
    });
}

function _replacePlaceholdersInLongText(text, args, pos) {
    return text.replace(/(%s)([1-99])/g, function (match, p1, p2) {
        var i = pos + parseInt(p2);
        return args[i] === undefined ? '' : args[i];
    });
}