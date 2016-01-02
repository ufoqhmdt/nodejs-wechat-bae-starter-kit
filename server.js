var express = require('express');
var crypto = require('crypto');
var app = express();
var wechat = require('wechat');
var config = {
    token: '', //你的自定义token,请保持wechat一致
    appid: '', //你的appid
    encodingAESKey: '', //你的endcodingAESKey
};

//http://mp.weixin.qq.com/wiki/8/f9a0b8382e0b77d87b3bcc1ce6fbc104.html
var checkSignature = function(query, token) {
    var signature = query.signature;
    var timestamp = query.timestamp;
    var nonce = query.nonce;

    var shasum = crypto.createHash('sha1');
    var arr = [token, timestamp, nonce].sort();
    shasum.update(arr.join(''));

    return shasum.digest('hex') === signature;
};

app.get('/', function(req, res) {
    if (checkSignature(req.query, config.token)) {
        res.send(req.query.echostr);
    } else {
        res.send('error');
    }
});

app.use(express.query());

app.use('/wechat', wechat(config, function(req, res, next) { // 微信输入信息都在req.weixin上   
    var message = req.weixin;
    if (message.FromUserName === 'diaosi') { // 回复屌丝(普通回复)      
        res.reply('hehe');
    } else if (message.FromUserName === 'text') { //你也可以这样回复text类型的信息       
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.FromUserName === 'hehe') { // 回复一段音乐     
        res.reply({
            type: 'music',
            content: {
                title: '来段音乐吧',
                description: '一无所有',
                musicUrl: 'http://mp3.com/xx.mp3',
                hqMusicUrl: 'http://mp3.com/xx.mp3',
                thumbMediaId: 'thisThumbMediaId'
            }
        });
    } else { // 回复高富帅(图文回复)     
        res.reply([{
            title: '你来我家接我吧',
            description: '这是女神与高富帅之间的对话',
            picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
            url: 'http://nodeapi.cloudfoundry.com/'
        }]);
    }
}));

var server = app.listen(18080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('BAE wechat app listening at http://%s:%s', host, port);
});