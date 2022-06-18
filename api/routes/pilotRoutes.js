const express = require("express");
const passport = require("passport");
const { checkUser } = require("../utility");
const { handleResponseErrors } = require("./handleResponseCases");

const pilotRoutes = (Pilot) => {
  const pilotRouter = express.Router();

  pilotRouter.route("/").get((req, res) => {
    Pilot.find((err, pilots) => {
      if (err) {
        return res.send(err);
      }
      const returnPilots = pilots.map((pilot) => {
        const newPilot = pilot.toJSON();
        delete newPilot.password;
        // delete newPilot._id;
        delete newPilot.__v;
        return newPilot;
      });
      return res.status(201).json(returnPilots);
    });
  });

  pilotRouter
    .route("/:id")
    .get((req, res) => {
      Pilot.findOne({ _id: req.params.id }, (err, pilot) => {
        if (err) {
          return res.send(err);
        }
        const newPilot = pilot.toJSON();
        delete newPilot.password;
        // delete newPilot._id;
        delete newPilot.__v;
        return res.status(201).json(newPilot);
      });
    })
    .patch(
      passport.authenticate("jwt", { session: false }),
      checkUser,
      (req, res) => {
        Pilot.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { new: true },
          (err, pilot) => {
            if (err) {
              return res.send(err);
            }
            if (!pilot) {
              return res.status(404).json();
            }
            const newPilot = pilot.toJSON();
            delete newPilot.password;
            // delete newPilot._id;
            delete newPilot.__v;
            return res.status(201).json(newPilot);
          }
        );
      }
    )
    .delete();
    
  pilotRouter.route("/search").post((req, res) => {
    Pilot.find(
      {
        name: { $regex: req.body.searchQuery, $options: "ixm" },
      },
      (err, pilots) => {
        if (err) {
          return res.send(err);
        }
        if (!pilots) {
          const returning = handleResponseErrors("invalidUser");
          return res.status(returning.status).json(returning.returnValue);
        }
        const returnPilots = pilots.map((pilot) => {
          const newPilot = pilot.toJSON();
          delete newPilot.password;
          // delete newPilot._id;
          delete newPilot.__v;
          return newPilot;
        });
        res.status(201).json(returnPilots);
      }
    );
  });

  pilotRouter.route("/filter").post((req, res) => {
    // TODO: filter by location, services and drones flown
    Pilot.find({ location: [req.body.location] }, (err, pilots) => {
      if (err) {
        res.send(err);
      }
      res.status(201).json(pilots);
    });
  });
  return pilotRouter;
};

module.exports = pilotRoutes;
