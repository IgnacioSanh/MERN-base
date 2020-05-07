const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

console.log("Listening on port 5000");

app.listen(5000);
