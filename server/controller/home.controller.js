const Home = require("../models/home")

//--------------------------add new home data 

const addHomeData = async (req, res) => {

    try{
        const {wallOfFames , clientsTestimonials , services , header} =req.body.home;
        const homedata = new Home({wallOfFames, clientsTestimonials , services , header})
        homedata.save()
         
        const data = res.status(200);
        data.send({homedata})
    }
    catch(e){
        res.status(400).send(e.message)
    }
}


//----------------------------------get home data

const getHomeData = async (req, res)=>{
    try {
        const homedata = await Home.find({})
        if(!homedata){
            throw Error("there is no data")
        }
        res.status(200).send(homedata)
    } catch (error) {
        res.status(500).send(error.message)
    }
}
//------------------------------update Home data

const updateHomeData= async (req,res)=>{

}

module.exports = {addHomeData,getHomeData,updateHomeData}