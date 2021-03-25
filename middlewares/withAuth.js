const User = require("../model/user.model");
const { verifyToken } = require("../utils/jwt.utils");
exports.withAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "unauthorized" });
  }
  next();
};

exports.protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    console.log(e);
    return res.status(401).end();
  }
  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();
  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  next();
};
