const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");


app.use(cookieParser());
app.use(function(req, res, next){
    res.cookie("loginName", "manojjj", {maxAge: 10000, httpOnly: true});
    next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", function(req, res){
    console.log(req.cookies)
    res.render("index");
})


app.listen(4444, () => console.log("running on 4444"));