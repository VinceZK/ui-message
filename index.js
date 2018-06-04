/**
 * Created by VinceZK on 2/3/17.
 */
const Message = require('./dist/node-message/message').Message;
const MsgFileStore = require('./dist/node-message/MsgFileStore').MsgFileStore;
const MsgFileStoreAsync = require('./dist/node-message/MsgFileStoreAsync').MsgFileStoreAsync;

module.exports = { Message: Message,
                   MsgFileStore: MsgFileStore,
                   MsgFileStoreAsync: MsgFileStoreAsync
};
