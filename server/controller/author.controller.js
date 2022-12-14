const Author = require("../models/author")

//--------------------------add new author 

const addAuthorData = async (req, res) => {

    try{
        const {name,email,phone,twAccount}=req.body
        const newAuthor= new Author({email,phone,twAccount,name})
        await newAuthor.save()
        res.status(200).send(newAuthor)
    }catch(e){
        res.status(500).send(e.message)
    }
}

//----------------------------get author by ID
const getAuthorByID = async (req ,res) => {
    try{
        const author = await Author.findOne({_id:req.params.id})

        if(!author) {
            return res.send(404).send('Cannot find author !')}
        res.status(200).send(author)
    }
    catch(e){
        res.status(400).send(e.message)
    }
}

//----------------------------------get all authors data

const getAllAuthors = async (req, res)=>{
    try {
        const author = await Author.find({})
        if(!author){
            throw Error("there is no author")
        }
        res.status(200).send(author)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

//----------------------------------delete all authors

const deleteAllAuthors = async  (req , res)=>{
    try{
        await Author.deleteMany({})

        res.status(200).send("deleted sucessfuly")
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

module.exports = {addAuthorData,getAuthorByID,getAllAuthors,deleteAllAuthors}
