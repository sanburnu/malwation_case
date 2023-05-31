var express = require('express');
var router = express.Router();

var User = require("../models/user");
const auth = require("../middleware/verifytoken");


/* GET users listing. */
router.get('/', auth, async function(req, res, next) {
  const users = await User.find({}).exec();
  const signedUser = await User.findById(req.user._id);
  res.render("users", { "users": users, "signedUser": signedUser});
});

/* Get individual User */
router.get('/:id', auth, async function(req, res, next) {
  const user = await User.findById(req.params.id);
  const signedUser = await User.findById(req.user._id);
  res.render("user", { "user": user, "signedUser": signedUser});
});

/* Editing individual User */
router.post('/:id', async (req, res, next) => {
  try {
    const id  = req.params.id;
    const { name, email, phone, role, active } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's data
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.role = role;
    user.active = active === 'on'; // Assuming the checkbox value is received as 'on' when checked

    // Save the updated user
    await user.save();

    return res.redirect("/users"); // Redirect to the users page
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

/* DELETE a user */
router.post("/:id/delete", auth, async function(req, res, next) {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  return res.redirect("/users");
});

module.exports = router;
