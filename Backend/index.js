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


mongoose.connect("mongodb+srv://jeffreydb:123321wwe@cluster0.ifm647s.mongodb.net/")

// API Creation

app.get('/', (req , res) => {
    res.send("Express app is running")
})

app.listen(port, (err) => {
    if (!err) {
        console.log("Server running on port:"+port)
    }
    else {
        console.log("error"+err)
    }
})

