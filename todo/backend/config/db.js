require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo Connected successfully');
  } catch (err) {
    console.error('MongoDB not connected - check connection string', err);
    process.exit(1);
  }
};

module.exports = connectDB;
