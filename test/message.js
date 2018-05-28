const MsgFileStore = require('../index').MsgFileStore;
const MsgFileStoreAsync = require('../index').MsgFileStoreAsync;
const msgFile = './example/message.json';
const Message = require('../index').Message;

describe("Message", function() {
    describe("Synchronous Message Reporting", function () {
        let message;
        before(function () {
            let msgStore = new MsgFileStore(msgFile);
            message = new Message(msgStore, 'EN');
        });

        it("should report a message short text in English with placeholders", function() {
            message.reportShortText('APP', 'APPLICATION_ERROR1','E', 'HELL', 'HEAVEN').should.eql(
                {
                    "msgCat": "APP",
                    "msgName": "APPLICATION_ERROR1",
                    "msgType": "E",
                    "msgShortText": "Application error 1 happened in HELL and HEAVEN!"
                }
            )
        });

        it("should report a message short text in English without placeholders", function() {
            message.reportShortText('APP', 'APPLICATION_ERROR1','E').should.eql(
                {
                    "msgCat": "APP",
                    "msgName": "APPLICATION_ERROR1",
                    "msgType": "E",
                    "msgShortText": "Application error 1 happened in  and !"
                }
            )
        });

        it("should report a message long text in English with placeholders", function() {
            message.reportLongText('APP', 'APPLICATION_ERROR1','E', 'HELL', 'HEAVEN').should.eql(
                {
                    "msgCat": "APP",
                    "msgName": "APPLICATION_ERROR1",
                    "msgType": "E",
                    "msgLongText": "Markdown Text HELL and HEAVEN and HEAVEN and HELL"
                }
            )
        });

        it("should report a message long text in English with half placeholders", function() {
            message.reportLongText('APP', 'APPLICATION_ERROR1','E', 'HELL').should.eql(
                {
                    "msgCat": "APP",
                    "msgName": "APPLICATION_ERROR1",
                    "msgType": "E",
                    "msgLongText": "Markdown Text HELL and  and  and HELL"
                }
            )
        });

        it("should return a null message", function(){
            should(message.reportShortText('APP1', 'APPLICATION_ERROR1','E', 'HELL')).eql(null);
            should(message.reportLongText('APP', 'APPLICATION_ERRORX','E', 'HELL')).eql(null);
        });

        it("should throw exception", function(){
            try{
                message.reportShortText('', '', '');
            }catch (err){
                err.message.should.eql('Message Category is missing!');
            }

            try{
                message.reportShortText('APP', 'APPLICATION_ERROR1', 'U');
            }catch (err){
                err.message.should.eql('Message Type is invalid!');
            }
        })
    });

    describe("Asynchronous Message Reporting", function () {
        let message;
        before(function () {
            let msgStore = new MsgFileStoreAsync(msgFile);
            message = new Message(msgStore, 'EN');
        });

        it("should read a message short text in English", function(done) {
            message.reportShortText('APP', 'APPLICATION_ERROR1','E', (message)=>{
                message.should.eql(
                    {
                        "msgCat": "APP",
                        "msgName": "APPLICATION_ERROR1",
                        "msgType": "E",
                        "msgShortText": "Application error 1 happened in HELL and HEAVEN!"
                    });
                done();
            }, 'HELL', 'HEAVEN')
        });

        it("should read a message short text in English", function(done) {
            message.reportLongText('APP', 'APPLICATION_ERROR1','W', (message)=>{
                message.should.eql(
                    {
                        "msgCat": "APP",
                        "msgName": "APPLICATION_ERROR1",
                        "msgType": "W",
                        "msgLongText": "Markdown Text HELL and HEAVEN and HEAVEN and HELL"
                    });
                done();
            }, 'HELL', 'HEAVEN')
        });

        it("should return a null message", function(done){
            message.reportLongText('APP1', 'APPLICATION_ERROR1','E', (message)=>{
                should(message).eql(null);
                done();
            })
        });

        it("should return a null message", function(done) {
            message.reportShortText('APP', 'APPLICATION_ERRORN', 'E', (message) => {
                should(message).eql(null);
                done();
            })
        })
    });
});