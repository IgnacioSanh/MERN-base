const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config/key");

const auth = async (req, res, next) => {
  const token = req.get("token");
  if (!token) {
    const err = new Error("No token sent");
    err.status = 403;
    return next(err);
  }
  try {
    const { _id: id } = jwt.verify(token, config.privateKey);
    const { role } = await User.findById(id);
    req.headers["role"] = role;
  } catch (ex) {
    const err = new Error(ex.message);
    err.status = 401;
    next(err);
  }
  next();
};

const admin = async (req, res, next) => {
  const role = req.get("role");
  if (role !== 1) {
    const err = new Error("The user is not admin");
    err.status = 403;
    return next(err);
  }
  next();
};

module.exports = { auth, admin };
