const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");
const Events = require("../model/commerce.model");
//Can find and edit Users and Commerces

exports.getUser = async (req, res) => {
  const { userId } = req.session;
  let user = await User.findOne({ _id: userId })
    .populate("following")
    .populate("eventsJoined")
    .populate("eventsCreated");
  if (!user)
    user = await Commerce.findOne({ _id: userId }).populate("eventsCreated");
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

exports.followCommerce = async (req, res) => {
  try {
    let updateUser;
    const { id } = req.params;
    const { userId } = req.session;
    const commerce = await Commerce.find({ _id: id });
    console.log(commerce);
    const checkUser = await User.find({ following: id });
    if (checkUser.length === 0) {
      updateUser = await User.findOneAndUpdate(
        userId,
        { $push: { following: commerce } },
        {
          new: true,
        }
      );
    } else {
      updateUser = await User.findOneAndUpdate(
        userId,
        { $pull: { following: id } },
        {
          new: true,
        }
      );
    }
    res.status(200).json({ user: updateUser });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "wrong request" });
  }
};
