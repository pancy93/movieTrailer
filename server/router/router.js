/** 
 * 处理路由
*/

const Router=require('koa-router');
const mongoose=require('mongoose');
const movieSchema=require('../model/movieSchema');

const router=new Router();

router.get('/trailer/all',async (ctx,next)=>{
    console.log('trailer/all');
    let Movie=mongoose.model('movie',movieSchema);
    ctx.body=await Movie.find();
});

router.get('/trailer/index/:count',async (ctx,next)=>{
    let count=Number(ctx.params.count);
    console.log('trailer/',count);
    let Movie=mongoose.model('movie',movieSchema);
    const maxcount=await Movie.find().count();
    if(count<maxcount){
        ctx.body=await Movie.find().limit(8).skip(count);
    }else{
        ctx.body="{'maxcount':'20'}";
    }
});

router.get('/trailer/detail/:id',async (ctx,next)=>{
    let Movie=mongoose.model('Movie',movieSchema);
    let id=ctx.params.id;
    console.log('trailer/detail',id);
    ctx.body=await Movie.find({doubanid:id});
});

module.exports=router;