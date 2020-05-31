// const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("../routes/user");
const error = require("../routes/error");

module.exports = function (app) {
  //Utilities to use
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/api/user", user);

  //Error handling
  app.use(function (err, req, res, next) {
    // res.status(err.status || 500);
    return res.status(err.status || 500).send({ error: err.message });
  });
};
