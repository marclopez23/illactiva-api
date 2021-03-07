const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  create,
  edit,
  deleteEvent,
} = require("../controllers/events.controllers");

route
  .post("/create", withAuth, create)
  .post("/edit", withAuth, edit)
  .post("/delete", withAuth, deleteEvent);

module.exports = route;
