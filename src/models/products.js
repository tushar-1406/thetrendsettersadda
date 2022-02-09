const mongoose=require("mongoose");
const async = require("hbs/lib/async");
const res = require("express/lib/response");



// productschema 
const productSchema=new mongoose.Schema({
    productName:String,
    price:Number,
    category:String,
    description:String,
    images:[{
      image:{
          type:String
      }

    }]
})

const Product=new mongoose.model("Product",productSchema);
module.exports=Product;