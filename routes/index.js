var express = require('express');
var router = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken")

const auth = require("../middleware/verifytoken");

router.get('/', async function(req, res, next) {
  if (req.cookies["auth-token"]) {
    const token = req.cookies["auth-token"]  
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = verified;
    const signedUser = await User.findById(req.user._id);
    res.render("index", {"signedUser": signedUser});
  } else {
    res.render("index");
  }
});


router.get("/register", function(req, res, next) {
  res.render("register");
});


router.get("/login", function(req, res, next) {
  res.render("login");
});


module.exports = router;
