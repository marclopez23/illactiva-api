const mongoose = require("mongoose");

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      match: EMAIL_REGEX,
    },
    hashedPassword: {
      type: String,
      require: true,
    },
    name: { type: String, required: true },
    direction: { type: String, required: true },
    category: {
      type: [String],
      required: true,
    },
    profileImg: { type: String },
    eventsJoined: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    eventsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commerce" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
