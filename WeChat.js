var sha1 = require("sha1"); //引入加密模块

class WeChat{
    constructor(config){
        this.config = config;
        this.token = config.token;
        this.appID = config.appID;
        this.appScrect = config.appScrect;
    }
    auth(req, res, next){
        var signature = req.query.signature,
        timestamp = req.query.timestamp,
            nonce = req.query.nonce;
        // token、timestamp、nonce三个参数进行字典序排序
        var arr = [this.token, timestamp, nonce].sort().join('');
        // sha1加密    
        var result = sha1(arr);
        return result === signature;
    }
    message(fromUserName,toUserName,content){
        return `<xml>
            <ToUserName><![CDATA[${fromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${toUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${content}]]></Content>
            </xml>`;
    }
}

module.exports = WeChat;