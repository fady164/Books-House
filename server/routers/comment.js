const { authen } = require('../middelware/auth2');
const { validation } = require('../middelware/validation');
const { addcomment, replayCommnet, Updatecomment, deletecomment } = require('../controller/comment.controller');

const router = require('express').Router();



router.patch('/addcomment/:id',addcomment)
router.patch('/replayCommnet/comment/:commentId/replay/:bookId',replayCommnet)
router.patch('/updatecomment/:commentId',Updatecomment)
router.delete('/deletecomment/:commentId',deletecomment)
