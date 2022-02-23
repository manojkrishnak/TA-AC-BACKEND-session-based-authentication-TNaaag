const createError = require("http-errors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./router/user.js");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
var flash = require('connect-flash');

require("dotenv").config();

mongoose.connect("mongodb://localhost/auth", err => console.log("connected ", err ? false : true));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(cookieParser());


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store:  MongoStore.create({ mongoUrl: 'mongodb://localhost/auth' })
  }));
app.use(flash());
app.use("/user", userRouter);
app.use(function(req, res, next){
    next(createError(404));
})


app.listen(4444, () => console.log("4444 it is"));