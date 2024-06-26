const express=require('express');

const { getMessages,sendMessage }=require('../handlers/messageHandlers');
const authUser =require('../middlewares/authUser');

const messageRouter=express.Router();

messageRouter.get('/getmessage/:receiverId',authUser,getMessages);
messageRouter.post('/sendmessage/:recieverId',authUser,sendMessage);

module.exports=messageRouter;