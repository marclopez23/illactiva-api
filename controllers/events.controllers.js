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
    const updateUser = await Commerce.findOneAndUpdate(
      email,
      { $push: { eventsCreated: event._id } },
      {
        new: true,
      }
    );
    return res.status(200).json({ event });
  } catch (e) {
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.edit = async (req, res) => {
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
      id,
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
    let updatedEvent = await Event.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(400).json({ updatedEvent: updatedEvent });
  } catch (e) {
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};
