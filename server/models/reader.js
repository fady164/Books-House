const mongoose=require('mongoose')


const time = {
    timestamps: {currentTime: () => new Date().setHours(new Date().getHours() + 2)}
}

const readerSchema=new mongoose.Schema({
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
        required:true
    },
    twAccount:{
        type:String,
        required:true,
    }
},
 
    time
)



const Reader=mongoose.model('Reader',readerSchema)
module.exports=Reader