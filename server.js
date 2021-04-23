// 引入express模块
var express = require("express");
var app = express();
var config = require("./config/config.json"); //引入配置文件
var WeChat = require("./WeChat")
var {getUserDataAsync, parseXMLAsync,formatMessage} = require("./common")
var chat = new WeChat(config);
app.get("/wx", (req, res, next)=> {
    if(chat.auth(req, res, next)){
        res.send(req.query.echostr);
    }else{
        res.send('mismatch');
    }
})
//接收消息
app.post("/wx",async (req, res, next)=> {
    if(chat.auth(req, res, next)){
        const xmlData = await getUserDataAsync(req);
        const jsData = await parseXMLAsync(xmlData);
        const message = formatMessage(jsData)
        let content = '无法识别';
        if(message.MsgType==='text'){
            content = '你好';
        }
        res.send(chat.message(message.FromUserName,message.ToUserName,content))
    }else{
        res.send('再见');
    }

})

// 监听1234端口
app.listen(1234);