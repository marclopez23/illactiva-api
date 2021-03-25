const jwt = require("jsonwebtoken");

exports.newToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

exports.verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
