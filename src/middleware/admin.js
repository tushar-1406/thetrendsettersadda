
const admin=async(req,res,next)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        if(email===process.env.EMAIL && password===process.env.PASSWORD)
        {
            req.isAdmin=true;
            //console.log(req.isAdmin);

        }     
        next();
        
    } catch (error) {
        console.log(error);
        res.send(error);
        
    }
}


module.exports=admin;