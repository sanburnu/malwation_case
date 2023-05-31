require("dotenv").config()
var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { registerValidation, loginValidation } = require("../models/userval") 

router.post("/register", async (req, res) => {

    const { name, email, password, phone, role } = req.body;

    //Joi validation
    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).render("register", {"message": `${error.details[0].message}`, "form": req.body})
    }

    // Checking if email already exists
    const emailExist = await User.findOne({email: email})
    if(emailExist) {
        return res.status(400).send("Email already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // New user
     const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        role: role,
    });
    try {
        const savedUser = await user.save();
        // Create jwt
        const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_TOKEN, {
        expiresIn: "15m",
      });
  
      // Set jwt token in the response cookie
      res.cookie("auth-token", token);
  
      res.redirect("/");
    } catch (err) {
      res.status(400).send(err);
    }
})

router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).render("login", {"message": `${error.details[0].message}`});
    }
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        // Not saying that email exists for security reasons
        return res.status(400).render("login", {"message": "Wrong email or password."})
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).render("login", {"message": "Wrong email or password."})
    }

    // Create jwt
    const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN, {expiresIn: "15m"});
    res.cookie("auth-token", token);
    res.redirect("/");
});

router.get("/logout", function(req, res, next) {
    res.clearCookie("auth-token");
    return res.redirect("/")
  });


module.exports = router;