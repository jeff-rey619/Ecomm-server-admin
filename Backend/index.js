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

app.listen(port, (err) => {
    if (!err) {
        console.log("Server running on port:"+port)
    }
    else {
        console.log("error"+err)
    }
})

