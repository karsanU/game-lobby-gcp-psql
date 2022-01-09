// create server
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// CROSS
var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type ,  Authorization,");

  next();
};

app.use(allowCrossDomain);

// setup the routes
const userRouter = require("./routes/user");
const playerRouter = require("./routes/player");
app.use(express.json());
app.use(userRouter);
app.use(playerRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
