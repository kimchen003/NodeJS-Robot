/**
 * @desc 引用模块
 */
var fs = require('fs');
var Path = require('path');
var url = require('url');
var _ = require('./Global');
var req = require("request");
var colors = require('colors');

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
            console.log("保存文件错误:"+err);
        };
        if (cb) cb();
        //console.log(path+"保存成功!")
    }

    var ws = fs.createWriteStream(path);

    //保存不同格式的文件
    switch(this.fileType(path).typeName){
        case "image":
            req(targetUrl).pipe(ws);
            break;
        default :
            ws.write(data);
            break;
    }

    //callback();

    console.log( ("保存:"+path).green);
    if(_.CurrentUrlQueue.length==0){
        console.log( ("当前队列:"+_.CurrentUrlQueue.length).cyan );
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
    return filetype
};


module.exports = File;