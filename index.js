const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/user");
const app = express();

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);
  console.log(user);
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
  });
  return res.status(200).json(user);
});

console.log("Listening on port 5000");

app.listen(5000);
