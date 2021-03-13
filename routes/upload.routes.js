const express = require("express");
const route = express.Router();
const fileParser = require("../config/cloudinary-setup.config");

route.post("/", fileParser.single("image"), (req, res, next) => {
  console.log("req.file", req.file);
  if (!req.file) {
    next(new Error("No file uploaded"));
    return;
  }
  res.json(req.file.path);
});

module.exports = route;
