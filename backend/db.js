

const mongoose = require('mongoose');
const User = require('./models/User');

// Define your MongoDB connection string and specify the database name
const mongoURI = "mongodb://localhost:27017/deardiary";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};


module.exports = connectToMongo;
