const mongoose = require("mongoose");

exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection established successfully! 😉");
  } catch (error) {
    console.error(error.message);
  }
};
