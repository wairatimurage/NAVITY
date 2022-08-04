const express = require("express");
const path = require("path");

const router = express.Router();
const Institution = require("../models/institutionModel");
const Pilot = require("../models/pilotModel");
const Enthusiasts = require("../models/enthusiastModel");
const Booking = require("../models/bookingModel");
const Quote = require("../models/quoteModel");
const Payments = require("../models/paymentModel");
const Post = require("../models/postModel");
const pilotRoutes = require("./api/pilotRoutes")(Pilot, Booking);
const institutionRoutes = require("./api/institutionsRoutes")(Institution);
const enthusiastsRoutes = require("./api/enthusiastRoutes")(Enthusiasts);
const authRoutes = require("./api/authRoutes")();
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
