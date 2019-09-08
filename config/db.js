const mongoose = require('mongoose');

// const config = require('config');
// const db = config.get('mongoURI');
const db = process.env.MONGO_URI;

// Using `dotenv` because Brad pushes his keys git, but that's not a good idea
// require('dotenv').config();
// Adding this to the start script instead as suggested in dotenv pages: "node -r dotenv/config server.js",

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected :)');
  } catch (error) {
    console.error('Error connecting to MongoDB :(');
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
