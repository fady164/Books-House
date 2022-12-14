const multer=require('multer');
const path=require('path');
// Add Avatar

// add storage images folder 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'../uploadsImgs/' )
    },
    filename: function (req, file, cb) {
      cb(null,new Date().toDateString(),file.originalname )
    }
  })

const uploads = multer({

    limits: {
        fileSize: 6000000
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
            cb(new Error('Please Upload Image'))
        }
        cb(null, true)
    },
    storage:storage
})

module.exports= uploads