// var http = require('http');
// var port = 18080;
// http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write('<h1>Node.js</h1>');
//     res.end('<p>Hello World</p>');
// }).listen(port);


var express = require('express');
var crypto = require("crypto");
var app = express();

function valid(req, res) {
    var TOKEN = 'weixin';
    var signature = req.params.signature;
    var timestamp = req.params.timestamp;
    var nonce = req.params.nonce;
    var echostr = req.params.echostr;
    var token = TOKEN;
    // res.send(isLegel(signature, timestamp, nonce, token));
    if (isLegel(signature, timestamp, nonce, token)) {
        res.send(echostr);
    } else {
        res.send('fail');
    }


}

function isLegel(signature, timestamp, nonce, token) {
    var array = new Array();
    array[0] = timestamp;
    array[1] = nonce;
    array[2] = token;
    array.sort();
    var hasher = crypto.createHash("sha1");
    var msg = array[0] + array[1] + array[2];
    hasher.update(msg);
    var msg = hasher.digest('hex'); //计算SHA1值   
    // return [msg,signature];
    if (msg == signature) {
        return true;
    } else {
        return false;
    }

    // var shasum = crypto.createHash('sha1');
    // var arr = [this.token, timestamp, nonce, encrypt].sort();
    // shasum.update(arr.join(''));

    // return shasum.digest('hex');
}

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
    // valid(req, res);
    console.log('--------------');
    console.log(req);
    checkSignature(req.query, 'wexin');
    // res.send({ufo:req.query});
    // res.send({ufo:req});
    res.send({
        query: req.query,
        params: req.params
    });

});

var wechat = require('wechat');
var config = {
    token: 'weixin',
    appid: 'wx870eb5ff3f3c932f',
    encodingAESKey: 'R4fdRXMHzN4MdJtTtAmXgYULP9dv41be9Ns9oGfzyJS'
};

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
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
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
    console.log('Example app listening at http://%s:%s', host, port);
});