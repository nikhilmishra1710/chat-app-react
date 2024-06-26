const express=require('express');

const { signup,login,logout, checkAuth }=require('../handlers/authHandlers');

const authRouter=express.Router();

authRouter.post('/verify',checkAuth)
authRouter.post('/signup',signup);
authRouter.post('/login',login);
authRouter.post('/logout',logout);

module.exports=authRouter;