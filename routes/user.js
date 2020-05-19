const express = require("express");
const router = express.Router();
const config = require("../config/key");
const { auth } = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/auth", auth, (req, res) => {
  if (!req.token) return res.status(400).json({ Error: "Token was not found" });
  return res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
  });
  return res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Find email
  let user = await User.findOne({ email: email });
  if (!user)
    return res
      .status(404)
      .json({ LoggedIn: false, Error: "The entered mail does not exist" });
  //Compare password
  let match = await user.comparePassword(password);
  if (!match)
    return res
      .status(400)
      .json({ LoggedIn: false, Error: "The password is not correct" });
  //Save Token
  user = await user.saveToken(config.privateKey);
  if (!user)
    return res
      .status(400)
      .json({ LoggedIn: false, Error: "Something went wrong" });

  return res.status(200).cookie("x-auth", user.token).json({ LoggedIn: true });
});

router.get("/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    return res.status(200).json({ LoggedOut: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ LoggedOut: false, Error: error });
  }
});

module.exports = router;
