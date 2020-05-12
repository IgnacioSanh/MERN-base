const express = require("express");
const app = express();

require("./startup/db")();
require("./startup/routes")(app);

console.log("Listening on port 5000");

app.listen(5000);
