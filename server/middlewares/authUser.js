const jwt=require('jsonwebtoken');

const authUser=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];

    console.log("token",token);

    if(!token){
        return res.status(401).json({message:"Access denied"});
    }
    try{
        const verified=jwt.verify(token,process.env.SECRET_KEY);
        if(!verified){
            return res.status(401).json({message:"Access denied"});
        }
        req.user=verified;
        console.log("verified",verified);
        next();
    }catch(error){
        console.log("",error);
    }
}

module.exports=authUser;