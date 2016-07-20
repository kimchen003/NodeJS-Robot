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
 * @param  str        string   页面代码
 * @param  callback   function 回调函数
 *
 * @return str string 调整后的页面代码
 */
Body.prototype.FixedAbsLink = function(str,callback){

    var newStr = str;

    while ((src = _.reg.findUncompleteAbsPath.exec(str)) != null)  {

        if(src[1]){
            newStr = newStr.replace(src[1],src[1].substring(1,src[1].length))
        }
    }

    callback(newStr);
};

module.exports = Body;