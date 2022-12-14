const mongoose  = require("mongoose");


const commentSchema=new mongoose.Schema({

 comment_body:{


type:String,
required:true

 },
 comment_By:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'


 }],
 book_id:[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'book'


 }],
 Replies :[{

    type:mongoose.Schema.Types.ObjectId,
    ref:'comment'

 }],
 likes:[{
 
 type:mongoose.Schema.Types.ObjectId,
 ref:'user'
 
 }]






},{timestamp:true})


const commentModel=mongoose.model('comment',commentSchema)

module.exports ={commentModel}