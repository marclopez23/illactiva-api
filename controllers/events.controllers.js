const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");
const Event = require("../model/event.model");

exports.create = async (req, res) => {
  try {
    const {
      email,
      title,
      description,
      eventImg,
      category,
      free,
      likes,
      price,
      location,
      date,
    } = req.body;
    const hasMissingInfo =
      !location ||
      !category ||
      !title ||
      !email ||
      !description ||
      !free ||
      !date;
    if (hasMissingInfo) {
      return res.status(400).json({ message: "missing info" });
    }
    let creator = await User.findOne({ email });
    if (!creator) {
      creator = await Commerce.findOne({ email });
    }
    const event = await Event.create({
      creator,
      title,
      description,
      eventImg,
      category,
      free,
      likes,
      price,
      location,
      date,
    });
      return res.status(200).json({ event });
  } catch (e) {
    console.log(e);
  }
};
