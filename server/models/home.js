const mongoose=require('mongoose')


const time = {
    timestamps: {currentTime: () => new Date().setHours(new Date().getHours() + 2)}
}



const homeSchema=new mongoose.Schema({
    wallOfFames : [{
        feedTitle : {type:String},
        feedPosition : {type:String},
        imgSrc : {type:String},
        paragraph : {type:String}
    }],
    clientsTestimonials: [{
        paragraph : {type:String},
        title : {type:String},
        desc : {type:String},
        img : {type:String}
    }],
    services: [{

        title : {type:String},
        desc : {type:String},
        btn : {type:String},
        path : {type:String}
    }]
},
 
    time)

    const WallOfFames =new mongoose.Schema( {
        feedTitle : {type:String},
        feedPosition : {type:String},
        imgSrc : {type:String},
        paragraph : {type:String}
    })
    



const Home=mongoose.model('Home',homeSchema)
module.exports=Home







