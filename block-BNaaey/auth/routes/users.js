var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.send("index", {title: "Express"});
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", (req, res) => {
  console.log(req.body)
})

module.exports = router;
