const { Router } = require("express");
const route = Router();
const { withAuth } = require("../middlewares/withAuth");
const {
  getCommerce,
  getCommerces,
} = require("../controllers/commerce.controllers");

route.get("/:id", getCommerce).get("/", getCommerces);

module.exports = route;
