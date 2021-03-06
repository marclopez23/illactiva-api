const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const { create } = require("../controllers/events.controllers");

route.post("/create", withAuth, create);

module.exports = route;
