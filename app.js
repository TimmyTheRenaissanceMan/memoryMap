//jshint esversion:10
require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
var session = require("express-session");
const passport = require("passport");
const fs = require("fs-extra");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
const findOrCreate = require("mongoose-findorcreate");
const request = require("request");
const rp = require("request-promise");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const ejs = require("ejs");
const morgan = require('morgan');


app.use(cors());
app.use(
    cors({
         origin: "*", // allow to server to accept request from different origin
         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
         credentials: true, // allow session cookie from browser to pass through
         allowedHeaders: "Content-Type, Authorization",
   })
);

app.use(cors());

app.set("trust proxy", 1);
app.use(morgan("dev"));
app.use(express.json({limit: '50mb'}));
//app.use(express.static("public"));
app.use(express.static(path.resolve('./client/build')));
app.set("view engine","ejs");

const https = require("https");
const http = require("http");
const server = http.createServer(app);

// app.use(function(err, req, res, next) {
//     req.io = io;
//     next();
// });

app.use(session({
  secret: "Our little secret.",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());
const User = require("./schemas/user");

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  app.use(busboy({ immediate: true }));
  app.use(busboyBodyParser({limit: '100mb'}));
  app.use(bodyParser.urlencoded({
    limit: "100mb",
    extended: true,
    parameterLimit:50000
  }));
// const chat_sockets = require("./modules/socket/chat_sockets");
 require("./config/passport")(passport);
 require("./config/database");
 //generateSitemap();
// require("./schemas/_all");
require("./routes/_all")(app);

server.listen(process.env.PORT || 5000, (req, res) =>{
  console.log("server is running");
});
