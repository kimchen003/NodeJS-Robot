/**
 * @desc 引用模块
 */
var colors = require('colors');
var _ = require('./Global');

/**
 * @desc 控制台类
 */
var Console = function(){

}

/**
 * @desc 打印
 *
 * @param string 信息
 * @param string 颜色
 */
Console.prototype.log = function(message,color){
    //console.log(message[color]);

    _.UserSocket.emit("send log",{
        color : color,
        log : message
    });
}

module.exports = new Console();