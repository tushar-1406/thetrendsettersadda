require("dotenv").config();
const express = require("express");
const res = require("express/lib/response");
const app = express();
const path = require("path");
require("./db/conn");
const User = require("./models/account");
const Product = require("./models/products");
app.set("view engine", "hbs");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
var multer = require("multer");

var detail;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
var upload = multer({ storage: storage });

const auth = require("./middleware/auth");
const admin = require("./middleware/admin");
const getUser = require("./middleware/getUser");
const async = require("hbs/lib/async");

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//serving public folder
const staticPath = path.join(__dirname, "../public");
app.use(express.static(staticPath));

//middleware for bootstrap
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

// customizing the views directory
const templatePath = path.join(__dirname, "../templates/views");
app.set("views", templatePath);

//creating partials path and registering
const partialsPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialsPath);

//creating routing

//homepage
app.get("/", getUser, (req, res) => {
  res.render("index");
});
//products page
app.get("/products", getUser, (req, res) => {
  if (req.user == undefined) res.render("products");
  else if (req.user.email == process.env.EMAIL) {
    res.render("productsadmin");
  }
  else
  {
    res.render("products");
  }
});

//about page
app.get("/about", (req, res) => {
  res.render("about");
});
//contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});
//cart page
app.get("/cart",getUser, (req, res) => {
  if(req.user==undefined)
  {
    res.render("account",{log2:"Please login first."});
  }
  res.render("cart");
});
//account page
app.get("/account", (req, res) => {
  res.render("account");
});

// is logged in?
app.get("/loggedIn", getUser, (req, res) => {
  if (req.user == undefined) res.send(false);
  else {
    res.send(true);
  }
});
// getUser for cart
app.get("/getUser", getUser, (req, res) => {
  res.send(req.user);
});
// logout user
app.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token != req.token;
    });
    res.clearCookie("jwt");
    await req.user.save();
    res.render("account");
  } catch (error) {
    res.send("login first");
  }
});

//registering a new user in our database

app.post("/signup", async (req, res) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        // phone: req.body.phone,
        password: req.body.password
      });
      const registered = await user.save();
      res
        .status(201)
        .render("account", { success: "Account registered sucessfully." });
    } else {
      res.status(201).render("account", { failed: "Password did not matched" });
    }
  } catch (error) {
    console.log(error);
    res.status(201).render("account", { failed: "Email already registered" });
  }
});

//login a user

app.post("/login", admin, async (req, res) => {
  try {
    const email = req.body.email;

    const password1 = req.body.password;
    const user = await User.findOne({ email: email });
    const isMatch = await bcrypt.compareSync(password1, user.password);

   

    if (isMatch) {
      const token = await user.generateAuthToken();
      user.isAdmin = req.isAdmin;
      res.cookie("jwt", token);
      await user.save();
      res.status(201).render("index", {
        userName: user.name,
      });
    } else {
      res
      .status(201)
      .render("account", { failed: "Incorrect Email or Password" });
    }
  } catch (error) {
    res
      .status(201)
      .render("account", { failed: "Email does not exist" });
  }
});

// adding product
app.post("/addproduct", upload.array("image1", 4), async (req, res) => {
  try {
    let fileinfo = req.files;

    const product = new Product({
      productName: req.body.productName,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });

    for (var i = 0; i < fileinfo.length; i++) {
      let name = fileinfo[i].filename.toString();
      product.images = product.images.concat({ image: name });
    }
    await product.save();

    res.render("productsadmin");
  } catch (error) {
    console.log(error);
  }
});

app.post("/addtocart", getUser, async (req, res) => {
  try {
    console.log(req.body.size);

    let res1=false;

    if(req.user!=undefined)
    {
    let addtocartuser = req.user;
    let producttocart = await Product.findOne({ _id: detail._id });
    for(var i=0;i<addtocartuser.cart.length;i++)
    {
      let a=Number(req.body.quantity);
      let b=Number(addtocartuser.cart[i].quantity);

      if(addtocartuser.cart[i].productId==producttocart._id && addtocartuser.cart[i].productSize==req.body.size)
      {
        addtocartuser.cart[i].quantity=a+b;
        res1=true;
        break;
      }
    }
    if(res1==false)
    {
    addtocartuser.cart = addtocartuser.cart.concat({
      productName: producttocart.productName,
      productPrice: producttocart.price,
      productSize: req.body.size,
      quantity: req.body.quantity,
      productId:producttocart._id,
      productImageName:producttocart.images[0].image
    });
  }

   const c= await addtocartuser.save();
    if(req.user.isAdmin==true)
    {
      res.render("cart");
    }
    else
    {
      res.render("cart");

    }
  }
  else
  {
    res.render("account",{log1:"Please login first."});
  }

 
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// getting products

app.get("/getProducts", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
app.get("/getProductsSorted", async (req, res) => {
  // const products = await Product.find();
  const products=await Product.find({}).sort({'productName': 1})
  res.send(products);
});
app.get("/getProductsHigh", async (req, res) => {
  // const products = await Product.find();
  const products=await Product.find({}).sort({'price': -1})
  res.send(products);
});
app.get("/getProductsLow", async (req, res) => {
  // const products = await Product.find();
  const products=await Product.find({}).sort({'price': 1})
  res.send(products);
});

//productdetail
app.post("/productdetail1", async (req, res) => {
  const productDetail = await Product.findOne({ _id: req.body.productID });
  detail = productDetail;
  res.send(productDetail);
});

// delteproduct
app.post("/deleteProduct", async (req, res) => {
 await Product.deleteOne({_id:req.body.productID}); 
 let allProducts=await Product.find();
  res.send(allProducts);
});
//editproduct



app.get("/detail", async (req, res) => {
  res.render("productdetail");
});
app.get("/getclickedproduct", async (req, res) => {
  res.send(detail);
});

app.post("/updateQuantity",getUser,async(req,res)=>{
  
  for(let i=0;i<req.user.cart.length;i++)
  {
    if(req.user.cart[i].productId==req.body.productID)
    {
      req.user.cart[i].quantity=req.body.quantity;
    }
  }
  await req.user.save();
  res.send(req.user);

})
app.post("/updatecart",getUser,async(req,res)=>{

  req.user.cart = req.user.cart.filter((currElement) => {
    return currElement.productId != req.body.productID;
  });

  await req.user.save();
  res.send(req.user);

})

app.get("/orderplaced",getUser,async(req,res)=>{


  req.user.cart=[];
  await req.user.save();

  res.send("true");
})
//creating server
app.listen(port, () => {
  console.log("listening");
});
