/**
 * @desc 引用模块
 */
var http = require("http");

/**
 * @desc 字典类
 *
 * @param str 要翻译的英文
 */
var Dictionary = function(str){
};

Dictionary.prototype.translateByYouDao = function (str,cb) {

    http.get("http://fanyi.youdao.com/openapi.do?keyfrom=NodeJsRobot&key=1134198303&type=data&doctype=json&version=1.1&q="+str, function(req) {

        var body = "";

        req.on('data',function(chunk){
            body+=chunk;
        }).on('end',function(){
            var obj = eval('('+body+')');
            //console.log("翻译结果:"+JSON.stringify(obj));
            if(cb)cb(obj.translation);
        });

    }).on('error', function(error) {
        console.log("翻译报错");
    });
}

module.exports = Dictionary;