//jshint esversion: 9
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
        .then(connect => console.log('connected to mongodb'))
        .catch(e => console.log('could not connect to mongodb', e));
//mongoose.connect("mongodb://localhost:27017/devancer", {useNewUrlParser: true});
