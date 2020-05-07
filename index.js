const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/newDB", { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello world");
});

console.log("Listening on port 5000");

app.listen(5000);
