/**
 * @desc 引用模块
 */
var Path = require("path");

/**
 * @desc 全局对象
 */
var Global = {
    //用户连接对象
    UserSocket : null,
    //当前下载目录
    downloadFile : "",
    //项目版本
    version : "1.0.0",
    //入口地址信息
    EntryPath : null,
    //访问链接域名
    CurrentPageOrigin: "",
    //当前页面链接
    CurrentPageUrl : "",
    //当前链接队列
    CurrentUrlQueue : [],
    //当前页面链接信息
    CurrentUrlInfo : null,
    //文件保存目录
    BaseFolder : "",
    //服务站点地址
    //webServerLink : "http://www.one-pieces-html5.com/",
    webServerLink : "http://172.16.82.82/playstation/node/robot/dev/",
    //正则表达式
    reg : {
        //搜索页面引用的资源
        findSourcePathInDom : /[url|src|href][\(|\=][\"|\']?(([^\"\'\s]*?)\.(css|js|png|jpg|gif|axd))(\?.+?)?[\"|\']?\)?/ig,
        //搜索CSS文件引用的资源
        findSourcePathInCss : /url\([\"|\']?(([^\"\']*?)\.?(css|js|png|jpg|gif|axd))(\?.+?)?[\"|\']?\)/ig,
        //搜索JS文件引用的资源
        findSourcePathInJs : /[\"|\'](([^\"\']+?)\.(css|js|png|jpg|gif|axd))(\?.+?)?[\"|\']/ig,
        //搜索音频文件
        findSoundPathInFile : /[\"|\'](([^\"\']*?)\.(CD|OGG|MP3|ASF|WMA|WAV|MP3PRO|RM|REAL|APE|MODULE|MIDI|VQ))(\?.+)?[\"|\']/ig,
        //匹配文件版本号
        findFileVersion : /\?.+/g,
        //匹配文件名
        findFileName : /\/(\S*?)\..+/i,
        //匹配需要补全的绝对路径
        findUncompleteAbsPath : /.+[src|href|url]=[\"|\'](\/[^\/].+\.(css|js|png|jpg|gif|axd))(\?.+?)?[\"|\']/ig,
        //匹配页面的编码方式
        findWebPageChartset : /charset=[\"|\']?(\S+?)[\"|\']/ig,
        //匹配后端文件后缀
        findServerFilesSuffix : /\.(php|aspx|shtml)/ig,
        //匹配html中的基础链接标签
        findHTMLBaseLinkTag : /\<base.+\/\>/ig

    },
    //丑陋参数(未来将废除)
    ugly : {
        //加载完成回调闸门
        hasSay : false
    }
};

/**
 * @desc 队列推进
 *
 * @return * 删除的元素值
 */
Global.QueueAdvance = function(){
    if(this.CurrentUrlQueue.length>0){
        return this.CurrentUrlQueue.shift()
    }
};

module.exports = Global;