// src/config/db.js
// Database configuration using mongoose
const mongoose = require("mongoose");
const uri = require("./mongodbURL");

const connectDB = async () => {
  await mongoose.connect(uri);
};

module.exports = connectDB;
