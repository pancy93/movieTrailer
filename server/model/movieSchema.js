/** 
 * movie的schema模型
*/

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

var movieSchema=new Schema({
    doubanid:String,
    title:String,
    poster:String,
    rate:Number,
    trailerpic:String,
    //trailerpage:String,
    trailervideo:String,
    year:String,
    original_title:String,
    summary:String,
    genres:Array,
    countries: Array,
    subtype:String,
    ratings_count:Number,
    casts:Array,
    directors:Array
});



module.exports=movieSchema;