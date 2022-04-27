//jshint esversion:9
const mongoose = require("mongoose");

module.exports = (function(){
  "use strict";

  const marker_schema = new mongoose.Schema({
    lat: Number,
    lng: Number,
    name: String,
    location: String,
    message: String,
    image: Boolean,
    audio: Boolean,
  });
  const Marker = new mongoose.model("Marker", marker_schema);
  return Marker;
})();
