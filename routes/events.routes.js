const { Router } = require("express");
const route = Router();

const { withAuth } = require("../middlewares/withAuth");
const {
  create,
  edit,
  deleteEvent,
  getEvent,
  getEvents,
  joinEvent,
} = require("../controllers/events.controllers");

route
  .post("/create", withAuth, create)
  .patch("/edit/:id", withAuth, edit)
  .delete("/delete/:id", withAuth, deleteEvent)
  .get("/:id", getEvent)
  .get("/", getEvents)
  .patch("/join/:id", joinEvent);

module.exports = route;
