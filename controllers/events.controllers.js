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
      const updateCommerce = await Commerce.findOneAndUpdate(
        { _id: id },
        { $push: { eventsCreated: event._id } },
        {
          new: true,
        }
      );
    } else {
      const updateUser = await User.findOneAndUpdate(
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
    console.log(event);
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
    const { id } = req.params;
    const { userId } = req.session;
    let type = "user";
    let user = await User.findOne({ _id: userId });
    if (!user) {
      user = await Commerce.findOne({ _id: userId });
      type = "commerce";
      if (!user)
        return res.status(400).json({ message: "user does not exist" });
    }
    const event = Event.findById(id);
    const checkUser = await User.find({ _id: userId, eventsJoined: id });
    if (type === "user") {
      if (checkUser.length === 0) {
        updateUser = await User.findOneAndUpdate(
          userId,
          { $push: { eventsJoined: id } },
          {
            new: true,
          }
        );
        console.log(checkUser.length === 0);
        updateEvent = await Event.findOneAndUpdate(
          id,
          { $push: { resgisteredUsers: userId } },
          {
            new: true,
          }
        );
      } else {
        updateUser = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { eventsJoined: id } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findOneAndUpdate(
          id,
          { $pull: { resgisteredUsers: userId } },
          {
            new: true,
          }
        );
      }
    } else {
      if (checkUser.length === 0) {
        updateUser = await Commerce.findOneAndUpdate(
          { _id: userId },
          { $push: { eventsJoined: id } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findOneAndUpdate(
          id,
          { $push: { resgisteredUsers: userId } },
          {
            new: true,
          }
        );
      } else {
        updateUser = await Commerce.findOneAndUpdate(
          userId,
          { $pull: { eventsJoined: id } },
          {
            new: true,
          }
        );
        updateEvent = await Event.findOneAndUpdate(
          id,
          { $pull: { resgisteredUsers: event } },
          {
            new: true,
          }
        );
      }
    }

    res.status(200).json({ user: updateUser, event: updateEvent });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "wrong request" });
  }
};
