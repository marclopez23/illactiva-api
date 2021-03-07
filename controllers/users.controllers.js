const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");

//Can find and edit Users and Commerces

exports.getUser = async (req, res) => {
  const { userId } = req.session;
  let user = await User.findOne({ _id: userId });
  if (!user) user = await Commerce.findOne({ _id: userId });
  res.status(200).json({ user: user });
};

exports.editUser = async (req, res) => {
  try {
    const { userId } = req.session;
    let user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    if (!user) {
      user = await Commerce.findOneAndUpdate({ _id: userId }, req.body, {
        new: true,
      });
    }
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "wrong request" });
  }
};
