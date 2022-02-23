const express = require("express");
const router = express();
const User = require("../model/user");

router.get("/", (req, res) => {
  console.log("session >> ", req.session);
  const message = req.session.flash.success[0];
  console.log(message);
  res.render("loginSuccess", { message });
});

router.get("/register", (req, res) => {
  res.render("register");
});



router.post("/register", (req, res) => {
  console.log(req.body);
  User.create(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    console.log("route ", err, result);
    // req.flash()
    res.redirect("/user/loginSuccess");
  });
});




router.get("/login", (req, res) => {
    const error = req.session.flash.error;
  console.log(error);
  res.render("login", {error});
});




router.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", { error: "You need to provide email and password" });
    return res.redirect("/user/login");
  }
  User.findOne({ email }, (err, user) => {
    console.log(err, user);
    if (!user) {
      req.flash("error", { error: "You have not registered" });
      return res.redirect("/user/register");
    }
    user.verifyPassword(password, (err, passwordMatched) => {
      console.log(passwordMatched);
      if (err) return next(err);
      if (!passwordMatched) {
        req.flash("error", { error: "Your email/password are incorrect" });
        res.redirect("/user/login");
      }
      req.session.userId = user.id;
      req.flash("success", "You have successfully logged in");
      res.redirect("/user/");
    });
  });
});

module.exports = router;
