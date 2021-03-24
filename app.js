require("dotenv").config();
const express = require("express");
const app = express();

require("./config/db.config")();
app.use((req, res, next) => {
  console.log("headers", req.headers)
 next()
})
app.set("trust proxy", true)
require("./config/session.config")(app);
require("./config/middleware.config")(app);

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/events.routes");
const userRoutes = require("./routes/user.routes");
const commerceRoutes = require("./routes/commerce.routes");
const uploadRoutes = require("./routes/upload.routes");
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/commerces", commerceRoutes);
app.use("/upload", uploadRoutes);

app.listen(process.env.PORT, () => console.log("server running"));
