![](http://cdnweb.b5m.com/web/cmsphp/article/201506/5baab4b432ec7c1f2b6cdfc32b1563a1.jpg) 

###nodeJs 爬虫实例<br>

####使用步骤:<br>

先安装项目依赖包 打开终端输入: `npm install`<br>

1.打开终端输入 : `node app`<br>
2.打开浏览器输入 : http://localhost:8312/Robot<br>
3.输入你想要下载的网站链接<br>
4.文件将会保存到目录中的 "download" 文件夹<br>

####版本:version 1.2.0<br>
#####升级内容:<br>
1.强化嗅探及抓取能力<br>
2.尝试抓取后端服务生成的页面<br>
#####修复问题:<br>
1.抓取及嗅探存在疏漏，会出现文件抓取遗漏现象<br>

####测试成功网站:<br>
1.http://www.one-pieces-html5.com/;<br>
2.http://www.kundian.net/default.aspx;<br>

####特性:<br>
1.爬虫特性明细嗅探及抓取同时进行<br>
2.能抓取常规前端资源及代码(如 js css html 及图片资源)<br>
3.可以以约定规则抓取后端服务生成的页面<br>

####缺陷:<br>
1.抓取及嗅探存在疏漏，会出现文件抓取遗漏现象(fixed)<br>
2.能抓取的资源相对较少，暂不能抓取如视频 svg font等。<br>
3.https不兼容<br>
4.不支持站点内容全抓取，只抓取相对路径资源<br>

#####(初始版本缺陷相对较多，后续版本将会逐步完善)<br>
