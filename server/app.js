const Koa=require('koa');
const path=require('path');
const views=require('koa-views');
const static=require('koa-static');
const router=require('./router/router');

const mongoose=require('mongoose');
const movieSchema=require('./model/movieSchema');

//链接数据库
mongoose.connect('mongodb://localhost/movieTrailer');
const db=mongoose.connection;
db.on('error',console.error.bind(console,'mongoose connection error: '));
db.once('open',function(){
    console.log('mongoose connection success.');
});

const app=new Koa();



//设置网页模板引擎
app.use(views(path.resolve('./server/views'),{
    extension:'pug'
}));



//静态资源目录，需要绝对路径（？）
app.use(static(path.join(__dirname,'./static')));

app.use(router.routes()).use(router.allowedMethods());

app.listen(8888);
console.log('server started');