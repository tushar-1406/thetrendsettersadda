const jwt=require("jsonwebtoken");
const User=require("../models/account");


const getUser=async(req,res,next)=>{
    try {

        const token=req.cookies.jwt;
        if(token==undefined)
        {
            req.user=undefined;
        }
        else
        {

        
        const user=jwt.verify(token,process.env.SECRET_KEY);

        const userfound=await User.findOne({_id:user._id});
        
        req.user=userfound;
        }
        
        next();
        
    } catch (error) {
        console.log(error);
        res.send("jkn");
        
    }
}

module.exports=getUser;