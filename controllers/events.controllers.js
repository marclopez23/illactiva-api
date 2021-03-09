const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");
const Event = require("../model/event.model");
const DeletedItem = require("../model/event.model");

exports.create = async (req, res) => {
  try {
    const id = req.session.userId;
    const { title, description, category, free, location, date } = req.body;
    const hasMissingInfo =
      !location || !category || !title || !description || !free || !date;
    if (hasMissingInfo) {
      return res.status(400).json({ message: "missing info" });
    }
    let creator = await User.findOne({ _id: id });
    if (!creator) {
      creator = await Commerce.findOne({ _id: id });
    }
    const event = await Event.create({
      creator,
      ...req.body,
      onModel: "Commerce",
    });
    const updateUser = await Commerce.findOneAndUpdate(
      { _id: id },
      { $push: { eventsCreated: event._id } },
      {
        new: true,
      }
    );
    return res.status(200).json({ event });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
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
    let updatedEvent = await Event.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    return res.status(400).json({ updatedEvent: updatedEvent });
  } catch (e) {
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById({ _id: id });
    await event.remove();
    const removeFromUser = await Commerce.findOneAndUpdate(
      { eventsCreated: { $in: [id] } },
      { $pull: { eventsCreated: id } },
      {
        new: true,
      }
    );
    return res.status(400).json({ message: "Event deleted successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id }).populate("creator");
    return res.status(200).json({ event: event });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    return res.status(200).json(events);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};
