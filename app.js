/**
 * @desc 模块引用
 */
var express = require("express");
var path = require("path");
var app = express();

var Robot = require("./module/Robot");
var server = require('http').Server(app);
var io = require("socket.io")(server);

var Dictionary = require("./module/Dictionary");
var dictionary = new Dictionary();

/**
 * @desc 服务配置
 */
app.set('views', path.join(__dirname, 'static'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'static')));

/**
 * @desc 创建服务
 */
var oUrl = "";
app.get("/robot",function(req,res){
    oUrl = req.query.url;
    res.render("robot",{
        url : oUrl
    });
});

/**
 * @desc io通信
 */
var user = [];
io.on("connection",function(socket){
    user.push(socket);

    if(oUrl){
        //实例化爬虫
        var robot = new Robot({
            url : oUrl,
            downloadFile : path.resolve(__dirname, "download"),//, socket.id.replace("/#","")),
            error : function(err){
                console.log(err);
                //翻译 en -> cn
                dictionary.translateByYouDao(err.toString(),function(cn){
                    socket.emit("send error",{text:cn[0]})
                });
            }
        });
        //运行爬虫抓取页面
        robot.grab();
    }
});

/**
 * @desc 广播
 */
var broadcast = function(event,data){
    for(var i=0;i<user.length;i++){
        user[i].emit(event,data);
    }
};

var port = 8312;
server.listen(port);
console.log("server listening on port :" + port)