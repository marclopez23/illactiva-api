const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  login,
  signup,
  logout,
  getCommerce,
  getCommerces,
} = require("../controllers/auth.controllers");

route
  .post("/signup", signup)
  .post("/login", login)
  .post("/logout", logout)
  .get("/commerce/:id", getCommerce)
  .get("/commerces", getCommerces);

module.exports = route;
