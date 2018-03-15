# 一个简单的前后端分离预告片网站

### 简介
本项目主要用到的技术栈或库：
>前端：vue,vue-router,muse-ui，puppeteer

>构建：webpack(vue-cli)

>后端：koa,mongoose

一个前后端分离的案例,前端vue（单页面）,后端koa,数据库mongodb，数据由puppeteer爬虫从豆瓣电影爬取。

后端提供api供前端调用,前端ajax请求获取数据

### 图示
首页
![home](./demo/home.gif)
详情页
![home](./demo/detail.gif)

### 开发环境
首先需要在本地配置好node（npm）和mongodb。
之后npm install依赖包，其中puppeteer安装如果报错可以在install前改一下代理：
```
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
```
在根目录下爬取豆瓣电影的数据存入数据库：
```
npm run crawler
```
运行服务器,服务器在8888端口：
```
npm start
```
在client/front目录下运行前端项目，在8080端口：
```
npm start
```
访问http://localhost:8080可以看到运行成功。
