'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MsgFileStore = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _collection = require('lodash/collection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by VinceZK on 5/27/18.
 * Get message content from backend persistence (DB, filesystem)
 * This is an example of file system persistence.
 */
exports.MsgFileStore = MsgFileStore;

/**
 * Constructor
 * @param file name
 * @constructor
 */

function MsgFileStore(file) {
    this.msgStore = _Connect(file);
    this.storeMode = 'Sync'; //Sync|Async
}

MsgFileStore.prototype.getMessageShortText = function (msgCat, msgName, langu) {
    var message = (0, _collection.find)(this.msgStore, function (message) {
        return message.msgCat === msgCat && message.msgName === msgName;
    });

    if (message) {
        return {
            msgCat: message.msgCat,
            msgName: message.msgName,
            msgShortText: message.msgText[langu] ? message.msgText[langu].shortText : message.msgText['EN'].shortText
        };
    } else {
        return null;
    }
};

MsgFileStore.prototype.getMessageLongText = function (msgCat, msgName, langu) {
    var message = (0, _collection.find)(this.msgStore, function (message) {
        return message.msgCat === msgCat && message.msgName === msgName;
    });

    if (message) {
        return {
            msgCat: message.msgCat,
            msgName: message.msgName,
            msgLongText: message.msgText[langu] ? message.msgText[langu].longText : message.msgText['EN'].longText
        };
    } else {
        return null;
    }
};

function _Connect(file) {
    return JSON.parse(_fs2.default.readFileSync(file, 'utf8'));
}