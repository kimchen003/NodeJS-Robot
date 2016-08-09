/**
 * @desc 引用模块
 */
var _ = require("./Global");
var url = require("url");
var Path = require("path");

/**
 * @desc 调整页面
 *
 */
var Body = function(){
};

/**
 * @desc   调整页面绝对路径
 *
 * @param  string   页面代码
 * @param  string   文件名后缀
 * @param  function 回调函数
 *
 * @return string 调整后的页面代码
 */
Body.prototype.FixedAbsLink = function(str,suffix,callback){

    var chartset = this.getChartSet(str);

    var newStr = "";
    //var str = str.toString().replace(_.reg.findHTMLBaseLinkTag,"");

    if( (chartset == "gbk") && (suffix !=".html") ){
        newStr = str;
    }else{
        newStr = str.toString().replace(_.reg.findHTMLBaseLinkTag,"");

        while ((src = _.reg.findUncompleteAbsPath.exec(str)) != null)  {

            if(src[1]){
                newStr = newStr.replace(src[1],src[1].substring(1,src[1].length))
            }
        }
    }

    //去除页面中的基础链接标签

    callback(newStr);
};

/**
 * @desc   获取页面编码方式
 *
 * @param  string  页面代码
 *
 * @return string  页面编码方式
 */
Body.prototype.getChartSet = function(str){
    var chartset = _.reg.findWebPageChartset.exec(str);

    if(chartset){
        chartset = chartset[1].toLowerCase()
    }

    return chartset;
};

module.exports = Body;