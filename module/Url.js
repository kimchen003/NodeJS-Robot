/**
 * @desc 引用模块
 */
var _ = require("./Global");
var url = require("url");
var Path = require("path");

/**
 * @desc Url操作类
 */
var Url = function(){

};

/**
 * @desc 获取当前页面的资源链接队列
 *
 * @param str string 页面代码
 */
Url.prototype.getSourceGroup = function(str,cb){
    //调整链接后的body
    var newBody = str;

    //查找Img标签开头的图片路径

    //DOM环境下
    while ((src = _.reg.findSourcePathInDom.exec(str)) != null)  {
        var parse = url.parse(src[1]);

        //目前版本暂不加载绝对路径资源
        if(!Path.isAbsolute(parse.path)){
            _.CurrentUrlQueue.push( this.Fixed(src[1]) );
        }
    }

    //CSS环境下
    while ((src = _.reg.findSourcePathInCss.exec(str)) != null)  {
        var parse = url.parse(src[1]);

        //目前版本暂不加载绝对路径资源
        if(!Path.isAbsolute(parse.path)){
            _.CurrentUrlQueue.push( this.Fixed(src[1],url.parse(_.CurrentPageUrl)) );
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
    //console.log(resPath)
    return result;

};

module.exports = Url;