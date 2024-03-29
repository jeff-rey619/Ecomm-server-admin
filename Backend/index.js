const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors")



app.use(express.json());
app.use(cors())

//  database connection
// user -jeffreydb  , pass - 123321wwe


// user-jeffbro4lyf pass-jeffrey

/* connecting database */

    mongoose.connect("mongodb+srv://jeffbro4lyf:jeffrey@cluster0.kajgeyw.mongodb.net/?retryWrites=true&w=majority")
    .then((res) => {
    console.log("Connected")
    })
    .catch((err) => {
    console.log(errs)
})

// API Creation

app.get('/', (req , res) => {
    res.send("Express app is running")
})

// Image storage engine

const storage = multer.diskStorage({
    destination: './Upload/Images',
    filename: (req, file, cb) => {
        return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const Upload = multer({
    storage:storage
})

// Creating Upload

app.use('/images', express.static('upload/images'))

app.post("/upload", Upload.single('product'), (req, res) => {
    res.json({
        Succes: 1,
        Image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
        
    },
    name: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    category: {
        type: String,
        required:true
    },
    new_price: {
        type: Number,
        required:true
        
    },
     old_price: {
        type: Number,
        required:true
        
    },
    date: {
        type: Date,
        default:Date.now
    },
    available: {
        type: Boolean,
        default:true
    },
    
    
    
})


app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];

        id= last_product.id+1
    } else {
        id=1
    }


    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        
    });
    console.log(product)
    await product.save();
    console.log("saved")
    res.json({
        success: 1,
        name:req.body.name
    })
})

// for deleteing product

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({
        id:req.body.id
    })
    console.log("removed")
    res.json({  
        success: 1,
        name:req.body.name
    })
})

// for getting all products

app.get('/allproducts', async (req, res) => {
    let products =await Product.find({

    })

    console.log("All products fetched")
    res.send(products)
})

// Schema creation for user model

const Users = mongoose.model('Users', {
    name: {
        type:String
    },
    email: {
        type: String,
        unique:true
    },
    password: {
        type: String
        
    },
    cartData:{
       type:Object
    },
    date: {
        type: Date,
        default:Date.now
    }
    
})

// ccreating endpoint for registering the user

app.post('/Signup', async (req, res) => {
    let Check = await Users.findOne({
        email: req.body.email
    });
    if (Check) {
        res.status(400).json({
            success: false,
            errors:"existing user found with same email id"
        })
    }

    let cart = {}

    for (let i = 0; i < 300; i++) {
      cart[i] =0
        
    }

    const user = new Users(
        {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData:cart
        }
    )

    await user.save()

    const data = {
        user: {
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom')
    res.json({
        success: true,
        token
    })
})
// Creating endpoint for user Login

app.post('/login', async (req ,res) => {
    let user = await Users.findOne({
        email: req.body.email
    });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id:user.id
                }
            }

            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true , token})
        }
         else {
        res.json({
            success: false,
            errors:"Wrong password"
        })
    }
    }
    else {
        res.json({
            success: false,
            errors:"Wrong email id"
        })
    }
   
})

// creating endpoint for new collection data    
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("new collection fetched")
    res.send(newcollection)
})

// creating endpoint for popular in women section

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "Women" })
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in women fetched")
    res.send(popular_in_women)
}) 

// creatind middle wear to fetch user
  const fetchuser = async (req ,res , next) => {
      const token = req.header('auth-token');
      if (!token) {
          res.status(401).send({errors:"Please authenticate using valid token"})
      }
      else {
          try {
              const data = jwt.verify(token, 'secret_ecom')
              req.user = data.user;
              next();
          }
          catch(err) {
              res.status(401).send({errors:err})
          }
      }
    }
// creating end points for adding products in cart data
app.post('/addtocart',fetchuser , async (req, res) => {
    console.log(req.body, req.user)
    let userData = await Users.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({ _id: req.user.id }, {
        cartData:userData.cartData
    })
})

// creating endpoint to remove product from cart data

app.post('/removefromcart', fetchuser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({ _id: req.user.id }, {
        cartData:userData.cartData
    }) 
        res.send("Removed")
    }
   
})


// creating endpoint for getting cart items

app.post('/getcart', fetchuser, async (req, res) => {
    console.log("Getcart")
    let userData = await Users.findOne({ _id: req.user.id })
    res.json(userData.cartData)
})


app.listen(port, (err) => {
    if (!err) {
        console.log("Server running on port:"+port)
    }
    else {
        console.log("error"+err)
    }
})

