const User = require("../model/user.model");
const Commerce = require("../model/commerce.model");
const Event = require("../model/event.model");
const DeletedItem = require("../model/event.model");

//Test

exports.create = async (req, res) => {
  try {
    let onModel = "User";
    const id = req.session.userId;
    const {
      title,
      description,
      category,
      free,
      date,
      hour,
      place,
      end,
    } = req.body;
    const hasMissingInfo =
      !category || !title || !description || !date || !place || !hour || !end;
    if (hasMissingInfo) {
      return res.status(400).json({ message: "missing info" });
    }
    let creator = await User.findOne({ _id: id });
    if (!creator) {
      creator = await Commerce.findOne({ _id: id });
      onModel = "Commerce";
    }
    const event = await Event.create({
      creator: id,
      ...req.body,
      onModel,
    });
    if (onModel === "Commerce") {
      const updateCommerce = await Commerce.findByIdAndUpdate(
        { _id: id },
        { $push: { eventsCreated: event._id } },
        {
          new: true,
        }
      );
    } else {
      const updateUser = await User.findByIdAndUpdate(
        { _id: id },
        { $push: { eventsCreated: event._id } },
        {
          new: true,
        }
      );
    }
    console.log(event);
    return res.status(200).json({ event: event });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.edit = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { id } = req.params;
    const {
      title,
      description,
      category,
      free,
      date,
      hour,
      place,
      end,
    } = req.body;
    const hasMissingInfo =
      !category || !title || !description || !date || !place || !hour || !end;
    if (hasMissingInfo) {
      console.log("missing");
      return res.status(400).json({ message: "missing info" });
    }
    let updatedEvent = await Event.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    console.log(updatedEvent);
    return res.status(200).json({ updatedEvent: updatedEvent });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById({ _id: id });
    await event.remove();
    if (event.onModel === "Commerce") {
      const removeFromCommerce = await Commerce.findOneAndUpdate(
        { eventsCreated: { $in: [id] } },
        { $pull: { eventsCreated: id } },
        {
          new: true,
        }
      );
    } else {
      const removeFromUser = await User.findOneAndUpdate(
        { eventsCreated: { $in: [id] } },
        { $pull: { eventsCreated: id } },
        {
          new: true,
        }
      );
    }
    return res.status(201).json({ message: "Event deleted successfully" });
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

exports.joinEvent = async (req, res) => {
  try {
    let updateUser;
    let updateEvent;
    const { id: eventId } = req.params;
    const { userId } = req.session;
    let checkUser;
    let type = "user";
    let user = await User.findOne({ _id: userId });
    if (user) {
      checkUser = await User.find({ _id: userId, eventsJoined: eventId });
    }
    if (!user) {
      user = await Commerce.findOne({ _id: userId });
      checkUser = await Commerce.find({ _id: userId, eventsJoined: eventId });
      type = "commerce";
      if (!user)
        return res.status(400).json({ message: "user does not exist" });
    }

    if (type === "user") {
      if (checkUser.length === 0) {
        updateUser = await User.findByIdAndUpdate(
          userId,
          { $push: { eventsJoined: eventId } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findByIdAndUpdate(
          eventId,
          { $push: { resgisteredUsers: userId } },
          {
            new: true,
          }
        );
      } else {
        updateUser = await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { eventsJoined: eventId } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findByIdAndUpdate(
          eventId,
          { $pull: { resgisteredUsers: userId } },
          {
            new: true,
          }
        );
      }
    } else {
      if (checkUser.length === 0) {
        updateUser = await Commerce.findByIdAndUpdate(
          { _id: userId },
          { $push: { eventsJoined: eventId } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findByIdAndUpdate(
          eventId,
          { $push: { resgisteredUsers: userId } },
          {
            new: true,
          }
        );
      } else {
        updateUser = await Commerce.findByIdAndUpdate(
          userId,
          { $pull: { eventsJoined: eventId } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findByIdAndUpdate(
          eventId,
          { $pull: { resgisteredUsers: event } },
          {
            new: true,
          }
        );
      }
    }
    res.status(200).json({ event: updateEvent });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "wrong request" });
  }
};
