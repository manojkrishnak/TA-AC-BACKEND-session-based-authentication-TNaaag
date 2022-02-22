const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/welcome", (req, res) => {
    res.render("welcome");
})

router.get("/signup", (req, res) => {
    res.render("register");
})


router.post("/signup", (req, res) => {
    User.create(req.body, (err, doc) => {
        if(err){
            return next(err);
        }
        console.log(err, doc);
        res.redirect("/user/welcome")
    })
})

module.exports = router;