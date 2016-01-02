# nodejs-wechat-bae-start-kit
基于nodejs,运行在百度应用引擎的,可以直接接入微信的sample project.
### 介绍
微信官网的文档只提供了PHP的sample code,在网络上面少有nodejs的相关sample project. 本项目是按照微信官网的文档,用nodejs实现的一个简单实例,可以轻松接入微信.并根据你自己的业务添加业务代码.
本实例是基于百度应用引擎的应用,目录结构基于最新的BAE 3.0.所以你可以轻松上传部署运行.

### 开始使用

* 打开server.js文件.找到如下代码,并根据你的微信应用添加配置.

```javascript
var config = {
    token: '', //你的自定义token,请保持wechat一致
    appid: '', //你的appid
    encodingAESKey: '', //你的endcodingAESKey
};
```

* 然后打开server.js,因为基于BAE,所以请请直接上传BAE运行.

```shell
npm install
npm start
```