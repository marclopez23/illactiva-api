const { Router } = require("express");
const route = Router();

const { withAuth } = require("../middlewares/withAuth");
const {
  create,
  edit,
  deleteEvent,
  getEvent,
  getEvents,
} = require("../controllers/events.controllers");

route
  .post("/create", create)
  .patch("/edit/:id", withAuth, edit)
  .delete("/delete/:id", withAuth, deleteEvent)
  .get("/:id", getEvent)
  .get("/", getEvents);

module.exports = route;
