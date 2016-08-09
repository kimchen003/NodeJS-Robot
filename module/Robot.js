/**
 * @desc 引用模块
 */
var req = require("request");
var File = require("./File");
var _ = require("./Global");
var Url = require("./Url");
var url = require("url");
var fs = require("fs");
var Body = require("./Body");
var Console = require("./Console");
var colors = require('colors');

/**
 * @desc 爬虫类
 *
 * @param url string 链接地址
 * @param error function 报错回调
 */
var Robot = function(obj){
    //入口地址
    this.firstUrl = obj.url || "";

    //日志回调
    this.log = obj.log;

    //报错回调
    this.error = obj.error;

    //文件操作
    this.oFiles = new File();
    this.oUrl = new Url();
    this.oBody = new Body();

    //目标地址
    this.targetUrl = this.oUrl.Fixed(this.firstUrl);

    //保存信息
    _.UserSocket = obj.userSocket;
    _.CurrentPageUrl = this.targetUrl;
    _.CurrentUrlQueue.push(this.targetUrl);
    _.CurrentUrlInfo = url.parse(this.targetUrl);
    _.BaseFolder = obj.downloadFile;
    _.CurrentPageOrigin = url.parse(this.targetUrl).protocol +"//"+ url.parse(this.targetUrl).host;

    _.downloadFile = obj.downloadFile;

    var linkPart = this.targetUrl.split("/");
    _.EntryPath = url.parse(linkPart.slice(0,linkPart.length-1).join("/")+"/");
};

/**
 * @desc 抓取并保存任务队列
 */
Robot.prototype.grab = function(){
    if(_.CurrentUrlQueue.length<=0)return;
    var self = this;

    Console.log( ("当前队列:"+_.CurrentUrlQueue.length) , "cyan" );

    var targetUrl = _.QueueAdvance();

    Console.log( ("请求:"+targetUrl) , "gray" );

    //若不是资源链接 保存页面链接以深入嗅探
    if(self.oFiles.fileType(targetUrl).type != "source"){
        _.CurrentPageUrl = targetUrl;
        _.CurrentUrlInfo = url.parse(targetUrl);
    }

    //请求页面
    req({
        url : targetUrl,
        encoding : null
    },function(err,res,body){

        if(err){
            if(self.error)self.error(err,targetUrl);
        };

        //页面文件后缀名
        var suffix = self.oFiles.fileType(_.CurrentPageUrl).suffix;

        //修改部分绝对路径为相对路径
        self.oBody.FixedAbsLink(body,suffix,function(newBody){

            //获取资源链接并加入队列
            self.oUrl.getSourceGroup(newBody,suffix,function(){

                var parse = url.parse(targetUrl);

                self.oFiles.save(parse.path,newBody,targetUrl);

                self.grab(parse);
            });

        });

    });
}

module.exports = Robot;