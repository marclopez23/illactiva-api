require("dotenv").config();
const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;
const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

module.exports = async () => {
  try {
    await mongoose.connect(MONGODB_URI, dbOptions);
    console.log("connected to db");
  } catch (e) {
    console.error(e);
  }
};
