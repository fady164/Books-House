const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const adminSchema = new mongoose.Schema({
  email: {
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true
   },
  password: { 
    type: String,
    required: true,
    trim:true
   },
   code:{
    type:String
   },
   refreshToken: [String],

});


adminSchema.pre("save", async function (next) {
    let user=this
  if (!user.isModified('password')) return 333;
  if(user.isModified("password")){console.log('yes modified')}
  
  user.password = await bcrypt.hash(
    user.password,
      parseInt(process.env.saltRounds)
    );
    console.log('pre save password: ' + user.password);
    if(user.isModified("password")){console.log('yes modifieddd')}
  
  
  
    next();
  });
adminSchema.pre('findByIdAndUpdate',async function (next){
    const hookData=await this.model.findOne(this.getQuery()).select("__v")
    console.log(hookData);
    this.set({__v:hookData.__v+1})
    if(hookData.__v>3){

res.json({message:'sorry no more req'})

    }else{

        next()

    }


    })


const Admin= mongoose.model("Admin", adminSchema);
module.exports = Admin;