const MsgFileStore = require('../dist/node-message/MsgFileStore').MsgFileStore;
const msgFile = './example/message.json';

describe("File System Message Storage Service", function() {
    let msgStore;

    before(function () {
        msgStore = new MsgFileStore(msgFile);
    });

    it("should read a message short text in English", function() {
        msgStore.getMessageShortText('SYS', 'SYSTEM_ERROR1','EN').should.eql(
            {
                "msgCat": "SYS",
                "msgName": "SYSTEM_ERROR1",
                "msgShortText": "System error 1 happened in %s!"
            }
        )
    });

    it("should read a message short text fallback to English", function() {
        msgStore.getMessageShortText('SYS', 'SYSTEM_ERROR1', 'DE').should.eql(
            {
                "msgCat": "SYS",
                "msgName": "SYSTEM_ERROR1",
                "msgShortText": "System error 1 happened in %s!"
            }
        )
    });

    it("should read a message short text in Chinese", function() {
        msgStore.getMessageShortText('SYS', 'SYSTEM_ERROR1', 'ZH').should.eql(
            {
                "msgCat": "SYS",
                "msgName": "SYSTEM_ERROR1",
                "msgShortText": "系统错误1发生在 %s!"
            }
        )
    });

    it("should read a message long text in Chinese", function() {
        msgStore.getMessageLongText('SYS', 'SYSTEM_ERROR1', 'ZH').should.eql(
            {
                "msgCat": "SYS",
                "msgName": "SYSTEM_ERROR1",
                "msgLongText": "长文本"
            }
        )
    });

    it("should read a message short and longtext in English", function() {
      msgStore.getMessage('SYS', 'SYSTEM_ERROR1','EN').should.eql(
        {
          "msgCat": "SYS",
          "msgName": "SYSTEM_ERROR1",
          "msgShortText": "System error 1 happened in %s!",
          "msgLongText": "Markdown Text"
        }
      )
    });

    it("should return empty message", function () {
        should(msgStore.getMessageShortText('APP', 'SYSTEM_ERROR1', 'EN')).eql(null);
    })
});
