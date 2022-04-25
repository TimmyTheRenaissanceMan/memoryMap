//jshint esversion:6
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

module.exports = (function(){
  "use strict";

  const user_schema = new mongoose.Schema({
    email: String,
    username: String, //email for password
    password: String

  });
  user_schema.plugin(passportLocalMongoose);
  user_schema.plugin(findOrCreate);
  const User = new mongoose.model("User", user_schema);
  return User;
})();
