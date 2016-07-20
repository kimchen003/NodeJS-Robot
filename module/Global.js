/**
 * @desc 引用模块
 */
var Path = require("path");

/**
 * @desc 全局对象
 */
var Global = {
    //项目版本
    version : "1.0.0",
    //访问链接域名
    CurrentPageOrigin: "",
    //当前页面链接
    CurrentPageUrl : "",
    //当前链接队列
    CurrentUrlQueue : [
        // "http://www.kundian.net/Content/Auto/Global.css",
        // "http://www.kundian.net/themes/HuXiu/resources/css/bootstrap.min.css",
        // "http://www.kundian.net/themes/HuXiu/resources/css/reset.css"
    ],
    //当前页面链接信息
    CurrentUrlInfo : null,
    //文件保存目录
    BaseFolder : "",
    //正则表达式
    reg : {
        //搜索页面引用的资源
        findSourcePathInDom : /[src|href|url]=[\"|\']([^\"\']?(\S*?)\.(css|js|png|jpg|gif|axd))(\?.+)?[\"|\']/ig,
        //findSourcePathInDom : /.+[src|href|url]=[\"|\']([^\"\']?(\S*?)\.(css|js|png|jpg|gif|axd))(\?.+)?[\"|\']/ig,
        //搜索CSS文件引用的资源
        findSourcePathInCss : /url\([\"|\']?((\S*?)\.?(css|js|png|jpg|gif|axd))(\?.+)?[\"|\']?\)/ig,
        //匹配文件版本号
        findFileVersion : /\?.+/g,
        //匹配需要补全的绝对路径
        findUncompleteAbsPath : /.+[src|href|url]=[\"|\'](\/[^\/].+\.(css|js|png|jpg|gif|axd))(\?.+)?[\"|\']/ig,
    },

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