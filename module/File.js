/**
 * @desc 引用模块
 */
var fs = require('fs');
var Path = require('path');
var url = require('url');
var _ = require('./Global');
var req = require("request");
var Console = require("./Console");
var archiver = require('archiver');

/**
 * @desc 文件操作类
 */
var File = function(){
};

/**
 * @desc 保存
 *
 * @param path string 路径
 * @param data string 内容
 * @param targetUrl string 请求链接
 */
File.prototype.save = function(path,data,targetUrl){

    var path = Path.join(_.BaseFolder,path);

    var self = this;
    var folderPath = Path.dirname(path);

    fs.exists(folderPath, function (exists) {
        if(exists){
            //目录存在
            self.createFile(path,data,targetUrl);
        }else{
            //目录不存在
            self.createFolder(folderPath,function(){
                self.createFile(path,data,targetUrl);
            });
        }
    });
};

/**
 * @desc 创建文件
 *
 * @param path string    路径
 * @param data  string    文件内容
 * @param cb   function  回调函数
 */
File.prototype.createFile = function(path,data,targetUrl,cb){

    //统一回调
    function callback(err){
        if (err){
            Console.log("保存文件错误:"+err);
        };
        if (cb) cb();
        console.log(path+"保存成功!")
    }

    var ws = fs.createWriteStream(path);


    //保存不同格式的文件
    switch(this.fileType(path).typeName){
        case "image":
            req(targetUrl).pipe(ws);
            break;
        case "music":
            req.get(targetUrl).pipe(ws);
            break;
        default :
            ws.write(data);
            break;
    }

    this.zip();

    //callback();
    Console.log( "保存到:"+path,"green" );

    var hasSay = false;
    if(_.CurrentUrlQueue.length==0 && !hasSay){

        //Console.log( "当前队列:"+_.CurrentUrlQueue.length,"cyan" );
        Console.log("完成！！！★★(｡・`ω´･) YEAR ~~★★","yellow");

        var folderName = _.UserSocket.id.replace(/\/|\#/ig,"");

        //显示前端下载地址
        _.UserSocket.emit("send zip",{
            src :  "download?zippath="+"download/"+ folderName+".zip",
            name : folderName+".zip"
        });

        hasSay = true;
    }

};

/**
 * @desc 递归创建目录
 *
 * @param path string    路径
 * @param cb   function  回调函数
 */
File.prototype.createFolder = function(path,cb){
    //递归创建目录 异步方法
    function mkdirs(dirname, mode, callback){
        fs.exists(dirname, function (exists){
            if(exists){
                callback();
            }else{
                mkdirs(Path.dirname(dirname), mode, function (){
                    fs.mkdir(dirname, mode, callback);
                });
            }
        });
    };
    mkdirs(path, 777, function(){
        if(cb)cb();
    });
};

/**
 * @desc  判断文件类型
 *
 * @param filePath string 文件路径
 *
 * @return object typeName-类型文本 type-类型
 */
File.prototype.fileType = function(filePath){
    var filetype = {};
    //获取文件后缀
    var suffix = Path.extname(filePath);

    switch(suffix){
        case ".mp3":
            filetype.typeName = "music";
            filetype.type = "source";
            break;
        case ".png":
        case ".jpg":
        case ".gif":
            filetype.typeName = "image";
            filetype.type = "source";
            break;
        default :
            filetype.typeName = "text";
            filetype.type = "txt";
            break;
    };

    filetype.suffix = suffix;

    return filetype
};

/**
 * @desc  获取文件名
 *
 * @param string 文件路径
 *
 * @return string 文件名
 */
File.prototype.fileName = function(path){
    var wrap = path.split("\\");

    var filename = wrap.slice(wrap.length-1, wrap.length).toString("");

    return filename;
};


/**
 * @desc  压缩到zip
 *
 */
File.prototype.zip = function(){
    var folderName = _.UserSocket.id.replace(/\/|\#/ig,"");

    var output = fs.createWriteStream('./download/'+folderName+'.zip');
    var archive = archiver('zip');

    archive.on('error', function(err){
        throw err;
    });

    archive.pipe(output);
    archive.bulk([
        { src: ['./download/'+folderName+'/**']}
    ]);
    archive.finalize();
};


module.exports = File;