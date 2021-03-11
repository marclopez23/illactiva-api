require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const { SESSION_SECRET, MONGODB_URI } = process.env;
console.log(MONGODB_URI);
module.exports = (app) => {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 3600000 * 24 * 14 },
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        ttl: 3600000 * 24 * 14,
      }),
    })
  );
};
