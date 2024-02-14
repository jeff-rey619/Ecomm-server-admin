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
mongodb+srv://jeffreydb:<password>@cluster0.ifm647s.mongodb.net/
