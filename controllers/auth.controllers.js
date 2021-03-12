const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");
const bcrypt = require("bcryptjs");
const {
  hasCorrectPasswordFormat,
  isMongoError,
  isMongooseErrorValidation,
} = require("../utils/validators.utils");

exports.signup = async (req, res) => {
  try {
    const {
      password,
      email,
      name,
      direction,
      category,
      profileImg,
      isCommerce,
      tags,
      schedule,
      description,
      neighbourhood,
      facebook,
      twitter,
      instagram,
    } = req.body;

    if (!isCommerce) {
      const hasMissingCredentials =
        !password || !email || !direction || !name || !category;
      if (hasMissingCredentials) {
        return res.status(400).json({ message: "missing credentials" });
      }
    }

    if (isCommerce) {
      const hasMissingCredentials =
        !password ||
        !email ||
        !direction ||
        !name ||
        !category ||
        !tags ||
        !schedule ||
        !description ||
        !neighbourhood ||
        !direction;
      if (hasMissingCredentials) {
        return res.status(400).json({ message: "missing credentials" });
      }
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }

    const user = await User.findOne({ email });
    const commerce = await Commerce.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user alredy exists" });
    }
    if (commerce) {
      return res.status(400).json({ message: "commerce alredy exists" });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;
    if (!isCommerce) {
      newUser = await User.create({
        email,
        hashedPassword,
        name,
        direction,
        category,
        profileImg,
      });
    }
    if (isCommerce) {
      newUser = await Commerce.create({
        email,
        hashedPassword,
        name,
        direction,
        category,
        profileImg,
        tags,
        schedule,
        description,
        neighbourhood,
        facebook,
        twitter,
        instagram,
      });
    }

    req.session.userId = newUser._id;
    return res.status(200).json({ user: newUser.email, id: newUser._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      console.log(e);
      return res.status(400).json({ message: "incorrect email format" });
    }
    if (isMongoError(e)) {
      return res.status(400).json({ message: "duplicate field" });
    }
    console.log(e);
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hasMissingCredentials = !password || !email;
    if (hasMissingCredentials) {
      return res.status(400).json({ message: "missing credentials" });
    }

    if (!hasCorrectPasswordFormat(password)) {
      return res.status(400).json({ message: "incorrect password format" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await Commerce.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "user does not exist" });
    }
    const hasCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );
    if (!hasCorrectPassword) {
      return res.status(401).json({ message: "unauthorize" });
    }

    req.session.userId = user._id;

    return res.status(200).json({ user: user.email, id: user._id });
  } catch (e) {
    if (isMongooseErrorValidation(e)) {
      return res.status(400).json({ message: "incorrect email format" });
    }
    return res.status(400).json({ message: "wrong request" });
  }
};

exports.logout = async (req, res) => {
  await req.session.destroy();
  res.status(200).json({ message: "logout" });
};
