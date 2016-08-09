/**
 * @desc 引用模块
 */
var _ = require("./Global");
var url = require("url");
var Path = require("path");
var Console = require("./Console");

/**
 * @desc Url操作类
 */
var Url = function(){

};

/**
 * @desc 获取当前页面的资源链接队列
 *
 * @param str    string 页面代码
 * @param suffix string 页面文件后缀名
 * @param cb     function 结束回调
 */
Url.prototype.getSourceGroup = function(str,suffix,cb){

    //根据不同文件选择嗅探方式
    switch(suffix){
        case ".js":
            //JS 环境下
            while ((src = _.reg.findSourcePathInJs.exec(str)) != null)  {
                var parse = url.parse(src[1]);

                //目前版本暂不加载绝对路径资源
                if(!Path.isAbsolute(parse.path)){
                    //js 里的资源链接应该基于“入口页”
                    //console.log("js获取的文件:"+this.Fixed(src[1], _.EntryPath))
                    _.CurrentUrlQueue.push( this.Fixed(src[1], _.EntryPath)  );
                }
            }
            break
        case ".css":
            //CSS 环境下
            while ((src = _.reg.findSourcePathInCss.exec(str)) != null)  {
                var parse = url.parse(src[1]);

                if(!Path.isAbsolute(parse.path)){
                    //css 里的资源链接应该基于“当前页”
                    //console.log("css获取的文件:"+ this.Fixed(src[1],url.parse(_.CurrentPageUrl)) )
                    _.CurrentUrlQueue.push( this.Fixed(src[1],url.parse(_.CurrentPageUrl)) );
                }
            }
            break;
        case ".html":
        default :
            //DOM环境下
            while ((src = _.reg.findSourcePathInDom.exec(str)) != null)  {
                var parse = url.parse(src[1]);

                //目前版本暂不加载绝对路径资源
                if(!Path.isAbsolute(parse.path)){
                    //console.log("html获取的文件:"+ this.Fixed(src[1]) )
                    _.CurrentUrlQueue.push( this.Fixed(src[1]) );
                }
            }
            break;
    }


    //查找音频文件
    while ((src = _.reg.findSoundPathInFile.exec(str)) != null)  {
        var parse = url.parse(src[1]);

        //目前版本暂不加载绝对路径资源
        if(!Path.isAbsolute(parse.path)){
            Console.log(this.Fixed(src[1], _.EntryPath))
            //js 里的资源链接应该基于“入口页”
            _.CurrentUrlQueue.push( this.Fixed(src[1], _.EntryPath)  );
        }
    }

    if(cb)cb();
};

/**
 * @desc Url补全
 *
 * @param url      string   链接
 * @param parent   string   父链接
 *
 * @return string 绝对路径
 */
Url.prototype.Fixed = function(sUrl,parent){

    var BaseParse =  parent || _.CurrentUrlInfo || url.parse(sUrl);

    var UrlParse = url.parse(sUrl);
    var resPath = "";

    if(UrlParse.path == "/"){
        resPath = "/index.html";
    }else{
        resPath = UrlParse.path;
    }


    result = url.resolve(BaseParse.href,resPath).replace(_.reg.findFileVersion,"");

    return result;

};

module.exports = Url;