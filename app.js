require("dotenv").config();
const express = require("express");
const app = express();

require("./config/db.config")();
require("./config/middleware.config")(app);
require("./config/session.config")(app);

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/events.routes");
const userRoutes = require("./routes/user.routes");
const commerceRoutes = require("./routes/commerce.routes");
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/commerces", commerceRoutes);

app.listen(process.env.PORT, () => console.log("server running"));
