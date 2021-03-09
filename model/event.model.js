const mongoose = require("mongoose");
const DeletedItem = require("./delete.model");

const EventSchema = mongoose.Schema(
  {
    creator: [{ type: mongoose.Schema.Types.ObjectId, refpath: "onModel" }],
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
      enum: [
        "talleres",
        "deportes",
        "exposiciones",
        "Visitas y tours",
        "infatil",
        "quedadas",
        "cine",
        "espectáculos",
        "charlas",
        "música",
        "otros",
      ],
    },
    free: { type: Boolean, required: true },
    likes: { type: Number },
    price: { type: Number },
    location: { type: String, required: true },
    date: { type: String, required: true },
    resgisteredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

EventSchema.post("remove", async (item) => {
  await DeletedItem.create({ collectionName: "Event", item });
});

module.exports = mongoose.model("Event", EventSchema);
