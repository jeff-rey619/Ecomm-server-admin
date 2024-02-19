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
// mongoose.set('strictQuery', false);
// mongoose.connect("mongodb+srv://jeffreydb:123321we@cluster0.ifm647s.mongodb.net/", {dbName : "Ecommerce"})
// .then( () => console.log('connected to database'))
// .catch(err=> console.error("not connected to database ",err));


mongoose.connect("?retryWrites=true&w=majority/EcommerceApp")
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

app.listen(port, (err) => {
    if (!err) {
        console.log("Server running on port:"+port)
    }
    else {
        console.log("error"+err)
    }
})

