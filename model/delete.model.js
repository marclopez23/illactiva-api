const mongoose = require("mongoose");
const DeletedSchema = new mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item: {
      type: Object,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("DeletedItem", DeletedSchema);
