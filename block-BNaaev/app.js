const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./router/user");
const path = require("path");



mongoose.connect("mongodb://localhost/user-auth", err => {
        console.log("connected ",err ? "false" : "true");
})

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", userRoutes);






app.listen(4444, () => console.log("4444"))