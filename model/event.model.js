const mongoose = require("mongoose");
const { startSession } = require("./delete.model");
const DeletedItem = require("./delete.model");

const EventSchema = mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" },
    onModel: {
      type: String,
      required: true,
      enum: ["User", "Commerce"],
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventImg: { type: String },
    category: {
      type: String,
      required: true,
    },
    free: { type: Boolean, required: true },
    likes: { type: Number },
    price: { type: String },
    date: { type: Date, required: true },
    hour: { type: String, required: true },
    end: { type: String, required: true },
    place: { type: String, required: true },
    maxUsers: { type: String, required: true },
    resgisteredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

EventSchema.post("remove", async (item) => {
  await DeletedItem.create({ collectionName: "Event", item });
});

module.exports = mongoose.model("Event", EventSchema);
