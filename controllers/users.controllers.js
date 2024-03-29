const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");
const Events = require("../model/commerce.model");

const { validateEmail } = require("../utils/validators.utils");

exports.getUser = async (req, res) => {
  const { userId } = req.session;
  let user = await User.findOne({ _id: userId })
    .populate("following")
    .populate("eventsJoined")
    .populate("eventsCreated");
  if (!user)
    user = await Commerce.findOne({ _id: userId })
      .populate("eventsCreated")
      .populate("following")
      .populate("eventsJoined");
  res.status(200).json({ user: user });
};

exports.editUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { userId } = req.session;
    const checkEmail = validateEmail(email);
    if (!checkEmail) {
      return res.status(400).json({
        message: "El correo electrónico tiene un formato erroneo",
      });
    }
    const userCheck = await User.findOne({ _id: { $ne: userId }, email });
    const commerceCheck = await Commerce.findOne({
      _id: { $ne: userId },
      email,
    });
    if (userCheck) {
      return res.status(400).json({
        message: "El correo electrónico ya existe para otro usuario",
      });
    }
    if (commerceCheck) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya existe para otro usuario" });
    }

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
    return res.status(400).json({ message: "Algo ha salido mal" });
  }
};

exports.followCommerce = async (req, res) => {
  try {
    let updateUser;
    const { id } = req.params;
    const { userId } = req.session;
    const commerce = await Commerce.find({ _id: id });
    const checkUser = await User.find({ _id: userId, following: id });
    if (checkUser.length === 0) {
      updateUser = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { following: commerce } },
        {
          new: true,
        }
      );
    } else {
      updateUser = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { following: id } },
        {
          new: true,
        }
      );
    }
    res.status(200).json({ user: updateUser });
  } catch (e) {
    return res.status(400).json({ message: "wrong request" });
  }
};
