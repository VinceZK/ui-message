/**
 * Created by VinceZK on 2/3/17.
 */
const Message = require('./dist/message').Message;
const MsgFileStore = require('./dist/MsgFileStore').MsgFileStore;
const MsgFileStoreAsync = require('./dist/MsgFileStoreAsync').MsgFileStoreAsync;

module.exports = { Message: Message,
                   MsgFileStore: MsgFileStore,
                   MsgFileStoreAsync: MsgFileStoreAsync
};