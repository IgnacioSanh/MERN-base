const { User } = require("../models/user");
const config = require("../config/key");

const auth = async (req, res, next) => {
  try {
    let token = req.cookies["x-auth"];
    if (!token) return next();
    let user = await User.findByToken(token, config.privateKey);
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log("The token was not found");
    next();
  }
};

module.exports = { auth };
