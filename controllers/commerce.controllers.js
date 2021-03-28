const Commerce = require("../model/commerce.model");

exports.getCommerce = async (req, res) => {
  const { id } = req.params;
  const commerce = await Commerce.findById({ _id: id })
    .populate("following")
    .populate("eventsJoined")
    .populate("eventsCreated");
  res.status(200).json(commerce);
};

exports.getCommerces = async (req, res) => {
  try {
    const commerces = await Commerce.find()
      .populate("following")
      .populate("eventsJoined")
      .populate("eventsCreated");
    return res.status(200).json({ commerces: commerces });
  } catch (e) {
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};
