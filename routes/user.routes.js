const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const { getUser, editUser } = require("../controllers/users.controllers");

route.get("/", withAuth, getUser).patch("/edit", withAuth, editUser);

module.exports = route;
