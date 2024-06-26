const express=require('express');

const { getContacts,addContact }=require('../handlers/userHandlers');
const authUser =require('../middlewares/authUser');

const userRouter=express.Router();

userRouter.get('/contacts',authUser,getContacts);
userRouter.post('/addcontact',authUser,addContact);


module.exports=userRouter;