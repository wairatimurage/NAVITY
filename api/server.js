const express = require("express");
const chalk = require("chalk");
const path = require("path");
const debug = require("debug")("server");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
// const methodOverride = require("method-override");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

// app variables and constants
const app = express();
const port = process.env.PORT || process.env.LOCAL_PORT || 2000;
const MONGODB_URI =
  "mongodb+srv://navity-test:navity123@navity.zrcip.mongodb.net/navity-test?retryWrites=true&w=majority";

// local imports
const Institution = require("./models/institutionModel");
const Pilot = require("./models/pilotModel");
const Enthusiasts = require("./models/enthusiastModel");
const Quote = require("./models/quoteModel");
const pilotRoutes = require("./routes/pilotRoutes")(Pilot);
const institutionRoutes = require("./routes/institutionsRoutes")(Institution);
const enthusiastsRoutes = require("./routes/enthusiastRoutes")(Enthusiasts);
const authRoutes = require("./routes/authRoutes")();
const quoteRoutes = require("./routes/quoteRoutes")(Quote);
const initializePassport = require("./passport-config");
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});
// database connections
process.env.NODE_ENV === "production"
  ? console.log("production")
  : console.log("development");
// eslint-disable-next-line no-unused-vars
const db = mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    err
      ? console.log(`there is a problem: ${err.message}`)
      : console.log("Successfully connected");
  }
);
mongoose.connection;

app.use(morgan("tiny"));
app.use(express.json());
// cors settings
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     `Access-Control-Allow-Headers`,
//     `Origin, X-Requsted-With, Content-Type, Accept, Authorization`
//   );
//   next();
// });

// console.log("secret", process.env.CLIENT_ID);
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
// app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "pages")));
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use("/api/pilots", pilotRoutes);
app.use("/api/institutions", institutionRoutes);
app.use("/api/enthusiasts", enthusiastsRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/auth", authRoutes);

app.get("/*", (req, res) => {
  // if (req.path !== "/api/*") {
  // console.log(req.user);
  // console.log(req.session);
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  // }
});
app.listen(port, () => debug(`Listening on port: ${chalk.green(port)}`));
