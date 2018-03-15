/** 
 * 执行trailerList.js子进程爬虫
 * 并将爬得的数据存进数据库
*/

const childProgress=require('child_process');
const mongoose=require('mongoose');
const movieSchema=require('../model/movieSchema');

mongoose.connect('mongodb://localhost/movieTrailer');
var db=mongoose.connection;
db.on('error',console.error.bind(console,'mongoose connection error: '));
db.once('open',function(){
    console.log('mongoose connection success.');
});

let child=childProgress.fork('./trailerList.js');
child.on('close',(code,signal)=>{
    console.log('child closed');
});
child.on('err',(err)=>{
    console.log('err: ',err);
});
child.on('message',(m)=>{
    console.log('message: ',m);
    //将爬得的数据按照模型存入数据库
    
        
        var Movie=mongoose.model('Movie',movieSchema);
        Movie.remove({},function(){
            console.log('reunit');
        });
        for(var i=0;i<m.length;i++){
            var newmovie=new Movie(m[i]);
            newmovie.save(function(err,r){
                console.log('received: ',r);
            });
        }
    
    
});
//child.send('hello child');

