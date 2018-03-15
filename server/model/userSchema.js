/** 
 * user的schema模型
*/

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var movieSchema=new Schema({
    doubanid:String,
    title:String,
    poster:String,
    rate:Number,
});

module.exports=movieSchema;