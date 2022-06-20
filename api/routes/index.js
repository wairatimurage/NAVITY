const router = require("express").Router();
const path = require("path");

const Institution = require("../models/institutionModel");
const Pilot = require("../models/pilotModel");
const Enthusiasts = require("../models/enthusiastModel");
const Quote = require("../models/quoteModel");
const pilotRoutes = require("./api/pilotRoutes")(Pilot);
const institutionRoutes = require("./api/institutionsRoutes")(Institution);
const enthusiastsRoutes = require("./api/enthusiastRoutes")(Enthusiasts);
const authRoutes = require("./api/authRoutes")();
const quoteRoutes = require("./api/quoteRoutes")(Quote);

router.use("/api/pilots", pilotRoutes);
router.use("/api/institutions", institutionRoutes);
router.use("/api/enthusiasts", enthusiastsRoutes);
router.use("/api/quotes", quoteRoutes);
router.use("/auth", authRoutes);

router.get("/*", (req, res) => {
  // if (req.path !== "/api/*") {
  // console.log(req.user);
  // console.log(req.session);
  console.log("called route");
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  // }
});

module.exports = router;
