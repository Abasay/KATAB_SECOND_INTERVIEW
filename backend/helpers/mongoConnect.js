const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    console.log(err);
    // process.exit(1); // Exit process with failure
  }
};

module.exports = mongoConnect;
