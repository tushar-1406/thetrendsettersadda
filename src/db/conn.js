const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 
}).then(()=>
    console.log("connection successful")
).catch((err)=>console.log(err));
