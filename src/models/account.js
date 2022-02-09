const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const async = require("hbs/lib/async");
const jwt=require("jsonwebtoken");
const res = require("express/lib/response");


const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    // number:{
    //     type:Number,
    //     unique:true
    // },
    password:String,
    tokens:[{
        token:{
            type:String
        }
    }],
    cart:[{
       productName:String,
       productPrice:Number,
       productSize:String,
       quantity:Number,
       productId:String,
       productImageName:String
    }],
    isAdmin:{
        type:Boolean,
        default:false
    }
    
   
    
})

// generating and returning token 
userSchema.methods.generateAuthToken=async function(){
    try {
        const token=jwt.sign({_id:this.id.toString()}, process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;

    } catch (error) {
        res.send(error);
        
    }
}

//hashing passowrd and saving as a middleware 

    userSchema.pre("save",async function(next){
        if(this.isModified("password"))
        {
            this.password=await bcrypt.hash(this.password,12);
        }
        next();
    })


const User=new mongoose.model("User",userSchema);
module.exports=User;