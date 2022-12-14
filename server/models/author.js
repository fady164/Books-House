const mongoose=require('mongoose')

const time = {
    timestamps: {currentTime: () => new Date().setHours(new Date().getHours() + 2)}
}

const authorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true

    },
    twAccount:{
        type:String,
        required:true,
        unique:true

    }
},
 
    time
)


const Author=mongoose.model('Author',authorSchema)
module.exports=Author