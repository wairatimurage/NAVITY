const express = require("express");
const path = require("path");
const db = require("../models");

const router = express.Router();
const Institution = require("../models/institutionModel")(
  db.sequelize,
  db.Sequelize
);
const Pilot = require("../models/pilotModel")(db.sequelize, db.Sequelize);
const Enthusiasts = require("../models/enthusiastModel")(
  db.sequelize,
  db.Sequelize
);
const Booking = require("../models/bookingModel")(db.sequelize, db.Sequelize);
const Quote = require("../models/quoteModel")(db.sequelize, db.Sequelize);
const Payments = require("../models/paymentModel")(db.sequelize, db.Sequelize);
const Post = require("../models/postModel")(db.sequelize, db.Sequelize);
const pilotRoutes = require("./api/pilotRoutes")(Pilot, Booking);
const institutionRoutes = require("./api/institutionsRoutes")(Institution);
const enthusiastsRoutes = require("./api/enthusiastRoutes")(Enthusiasts);
const authRoutes = require("./api/authRoutes")(Pilot, Institution, Enthusiasts);
const paymentRoutes = require("./api/paymentRoutes")(Payments, Booking);
const quoteRoutes = require("./api/quoteRoutes")(Quote);
const postRoutes = require("./api/postRoutes")(Post);

router.use("/api/pilots", express.json({ limit: "20MB" }), pilotRoutes);
router.use(
  "/api/institutions",
  express.json({ limit: "20MB" }),
  institutionRoutes
);
router.use(
  "/api/enthusiasts",
  express.json({ limit: "20MB" }),
  enthusiastsRoutes
);
router.use("/api/quotes", quoteRoutes);
router.use("/api/payment", paymentRoutes);
router.use("/api/blog", postRoutes);
router.use("/auth", authRoutes);

router.get("/*", (req, res) => {
  // if (req.path !== "/api/*") {
  // console.log(req.user);
  // console.log(req.session);
  console.log("called route");
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
  // }
});

module.exports = router;
