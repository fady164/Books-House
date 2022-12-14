const { commentModel } = require("../models/comment")
const bookModel = require("../models/book")


// -----------------------------------------------------Add comment
const addcomment=async(req,res)=>{

const {comment_body}=req.body
const {id}=req.params

const findBook=await bookModel.findOne({_id:id})
if(!findBook){

    res.status(404).json({message:"Invalid book id"})


}else{

    const newComment=new commentModel({comment_body,comment_By:req.user._id,book_id:findBook.id})
    const saveComment=await newComment.save()

    await bookModel.findByIdAndUpdate({_id:findBook.id},{$push:{comments:saveComment._id}})

    res.status(200).json({message:"Done",saveComment})

}

}

// -----------------------------------------------------replaycomment

const replayCommnet=async(req,res)=>{

const {comment_body}=req.body

const {bookId,commentId}=req.params


const findBook=await bookModel.findOne({_id:bookId})

if(!findBook){

    res.status(404).json({message:"Invalid book id"})

}else{

const findCommnet=await commentModel.findOne({_id:commentId})

if(!findCommnet){

    res.status(401).json({message:"invalid comment id"})


}else{

const replay=new commentModel({comment_body,comment_By:req.user._id,book_id:findBook.id})
const saveReplay=await replay.save()

await commentModel.findByIdAndUpdate({_id:commentId},{$push:{Replies:saveReplay._id}})
res.status(200).json({message:"Done",saveReplay})


}


}
}
// ------------------------------------------------------- Update comment 

const  Updatecomment=async (req,res)=>{

const {comment_body}=req.body
const {commentId}=req.params

const findCommnet=await commentModel.findOne({_id:commentId,comment_By:req.user._id})
if(!findCommnet){

    res.status(200).json({message:"invalid comment id"})


}else{

await commentModel.findByIdAndUpdate({_id:commentId},{comment_body:comment_body},{new:true})

res.status(200).json({message:"Done"})

}


} 
// ------------------------------------------------------- Update deleet 
const  deletecomment=async (req,res)=>{

const {commentId}=req.params
const findCommnet=await commentModel.findOne({_id:commentId,comment_By:req.user._id})
if(findCommnet ){

    
    await commentModel.findByIdAndDelete({_id:commentId},{new:true})
    
    res.status(200).json({message:"Done"})
    
}else{
    
    res.status(200).json({message:"invalid comment id"})

}


} 



module.exports = {addcomment,replayCommnet,Updatecomment,deletecomment}