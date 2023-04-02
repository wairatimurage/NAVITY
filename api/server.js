const express = require("express");
const chalk = require("chalk");
const path = require("path");
const debug = require("debug")("server");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

// app variables and constants
const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT || 2000;

// local imports
const db = require("./models");
const initializePassport = require("./utilities/passport-config");
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
// database connections
process.env.NODE_ENV === "production"
  ? console.log("production")
  : console.log("development");
// eslint-disable-next-line no-unused-vars

//connect to database and create tables if they don't exist
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to sync db: " + err.message);
  });

app.use(morgan("tiny"));
app.use(express.json({ limit: "20MB" }));
// cors settings
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requsted-With, Content-Type, Accept, Authorization`
  );
  res.header(
    `Access-Control-Expose-Headers`,
    `Origin, X-Requsted-With, Content-Type, Accept, Authorization`
  );
  next();
});

// calling pasport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50MB" }));
app.use("", express.static(path.join(__dirname, "./images/avatars")));
app.use("", express.static(path.join(__dirname, "../frontend/build")));

app.use(require("./routes"));
app.listen(port, () => debug(`Listening on port: ${chalk.green(port)}`));
