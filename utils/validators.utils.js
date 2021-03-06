const mongoose = require("mongoose");

const isMongooseErrorValidation = (error) =>
  error instanceof mongoose.Error.ValidationError;

const isMongoError = ({ code: errorCode }) => errorCode === 11000;

const hasCorrectPasswordFormat = (password) => {
  const passRegEx = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/);
  return passRegEx.test(password);
};

module.exports = {
  isMongoError,
  isMongooseErrorValidation,
  hasCorrectPasswordFormat,
};
