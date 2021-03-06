const express = require("express");
const path = require("path");
const mongoose = require("./config/mongoose");
const fileUpload = require("express-fileupload");
const userRouter = require("./routers/userRoute");
const homeRouter = require("./routers/homeRoute");
const bodyParser = require("body-parser");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const cookieParse = require('cookie-parser')
const cors = require('cors')
const dotenv = require("dotenv");

// import routes
const postRoute = require('./routers/postRouter');
// middle wares
const PORT = 4000;
const app = express();

dotenv.config({ path: "./config/config.env" });

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "assets")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse())
app.use(fileUpload());
app.use(cors())


//Router middleware
app.use(userRouter);
app.use(postRoute)


// app.get("/", (req, res) => {
//   return res.render("home");
// });

// app.get("/signup", (req, res) => {
//   return res.render("signup");
// });

// app.get("/login", isAuthenticated, (req, res) => {
//   return res.render("login");
// });


app.use(homeRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log("there is error");
  }
  console.log("app is running on port: ", PORT);
});
