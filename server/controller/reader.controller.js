const Reader = require("../models/reader")

//--------------------------add new  reader 

const addReaderData = async (req, res) => {

    try{
        const {name,email,phone,twAccount}=req.body
        const newReader= new Reader({email,phone,twAccount,name})
        await newReader.save()
        res.status(200).send(newReader)
    }catch(e){
        res.status(500).send(e.message)
    }
}

//----------------------------get reader by ID
const getReaderByID = async (req ,res) => {
    try{
        const reader = await Reader.findOne({_id:req.params.id})

        if(!reader) {
            return res.send(404).send('Cannot find reader !')}
        res.status(200).send(reader)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

//----------------------------------get all readers data

const getAllReaders = async (req, res)=>{
    try {
        const readers = await Reader.find({})
        if(!readers){
            throw Error("there is no readers")
        }
        res.status(200).send(readers)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//----------------------------------delete all readers

const deleteAllReaders = async  (req , res)=>{
    try{
        await Reader.deleteMany({})

        res.status(200).send("deleted successfuly")
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

module.exports = {addReaderData,getReaderByID,getAllReaders,deleteAllReaders}
