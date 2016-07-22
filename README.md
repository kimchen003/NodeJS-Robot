![](http://cdnweb.b5m.com/web/cmsphp/article/201506/5baab4b432ec7c1f2b6cdfc32b1563a1.jpg)

###nodeJs 爬虫实例

####使用步骤:

先安装项目依赖包 打开终端输入: `npm install`

1.打开终端输入 : `node app`
2.打开浏览器输入 : [http://localhost:8312/Robot](http://localhost:8312/Robot)
3.输入你想要下载的网站链接
4.文件将会保存到目录中的 "download" 文件夹

####版本:version 1.3.0  
#####升级内容:
1.强化嗅探及抓取能力  
2.可以抓取音频格式文件  
#####修复问题:  
1.抓取js中的资源路径不准确  

####测试成功网站:
1.http://www.one-pieces-html5.com/  
2.http://www.kundian.net/default.aspx 
3.http://www.one-pieces-html5.com/waibao/crossfire/shakeh5/project/index.html    
4.http://www.one-pieces-html5.com/waibao/cf/index.html  
5.http://www.one-pieces-html5.com/waibao/lol/index.html 

####特性:
1.爬虫特性明细嗅探及抓取同时进行
2.能抓取常规前端资源及代码(如 js css html 音频及图片资源)
3.可以以约定规则抓取后端服务生成的页面

####缺陷:
1.能抓取的资源相对较少，暂不能抓取如视频 svg font等。   
2.https不兼容   
3.不支持站点内容全抓取，只抓取相对路径资源    

#####(初始版本缺陷相对较多，后续版本将会逐步完善)
