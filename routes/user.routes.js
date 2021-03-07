const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  getUser,
  editUser,
  followCommerce,
} = require("../controllers/users.controllers");

route
  .get("/", withAuth, getUser)
  .patch("/edit", withAuth, editUser)
  .patch("/follow/:id", withAuth, followCommerce);

module.exports = route;
