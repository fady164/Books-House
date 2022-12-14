// const Service = require("../models/service")

// //--------------------------add new service 

// const addServiceData = async (req, res) => {

//     try{
//         const {serviceName, serviceDesc , servicePrice,reviewsNumber}=req.body
//         const newService= new Service({serviceName, serviceDesc , servicePrice,reviewsNumber})
//         await newService.save()
//         res.status(200).send(newService)
//     }catch(e){
//         res.status(500).send(e.message)
//     }
// }

// //----------------------------get service by ID
// const getServiceByID = async (req ,res) => {
//     try{
//         const Service = await Service.findOne({_id:req.params.id})

//         if(!service) {
//             return res.send(404).send('Cannot find service !')}
//         res.status(200).send(Service)
//     }
//     catch(e){
//         res.status(400).send(e.message)
//     }
// }


// //----------------------------------get all services data

// const getAllServices = async (req, res)=>{
//     try {
//         const services = await Service.find({})
//         if(!services){
//             throw Error("there is no services")
//         }
//         res.status(200).send(services)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// }

// //----------------------------------delete all services

// const deleteAllServices = async  (req , res)=>{
//     try{
//         await Service.deleteMany({})

//         res.status(200).send("deleted sucessfuly")
//     }
//     catch(e){
//         res.status(500).send(e.message)
//     }
// }

// module.exports = {addServiceData,getServiceByID,getAllServices,deleteAllServices}