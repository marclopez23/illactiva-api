const Commerce = require("../model/commerce.model");

exports.getCommerce = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const commerce = await Commerce.findOne({ _id: id });
  res.status(200).json(commerce);
};

exports.getCommerces = async (req, res) => {
  try {
    const commerces = await Commerce.find();
    return res.status(200).json({ commerces: commerces });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: "Something gone wrong try again" });
  }
};
