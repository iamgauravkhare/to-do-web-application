const mongoose = require("mongoose");
// const session = require('express-session');
// const connectMongo = require('connect-mongo');
// const MongoStore = connectMongo(session);

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established successfully");
  } catch (error) {
    console.log(error.message);
  }
};
