const express = require("express");
const passport = require("passport");
const {
  checkUser,
  updateProfileAvatar,
  updateProfileResponse,
} = require("../../utilities/utility");
const { handleResponseErrors } = require("./handleResponseCases");

const pilotRoutes = (Pilot, Booking) => {
  const pilotRouter = express.Router();

  pilotRouter.route("/").get((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
    Pilot.find((err, pilots) => {
      if (err) {
        return res.send(err);
      }
      const returnPilots = pilots.map((pilot) =>
        updateProfileResponse(pilot, _host)
      );
      return res.status(201).json(returnPilots);
    });
  });

  pilotRouter
    .route("/booking")
    .get(checkUser, (req, res) => {
      console.log("ss: ",)
      Booking.find({ "client.email": req.user.email })
        .then((_res) => {
          console.log("ss: ", _res);
          res.status(304).json(_res);
        })
        .catch((_err) => {
          console.log(_err);
          res.status(500).json({
            errorMessage: "Sorry! An error occured. Please ty again.",
          });
        });
    })
    .post(async (req, res) => {
      const _booking = new Booking({ ...req.body, bookingDate: new Date() });
      await _booking.validateSync();

      _booking
        .save()
        .then((_res) => {
          console.log("ss: ", _res);
          res.status(201).json(_res);
        })
        .catch((_err) => {
          console.log(_err);
          res.status(500).json({
            errorMessage: "Sorry! An error occured, please try again.",
          });
        });
    });

  pilotRouter.route("/search").post((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
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
        const returnPilots = pilots.map((pilot) =>
          updateProfileResponse(pilot, _host)
        );
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

  pilotRouter
    .route("/:id")
    .get((req, res) => {
      const _host = req.protocol + "://" + req.get("host") + "/";
      Pilot.findOne({ _id: req.params.id }, (err, pilot) => {
        if (err) {
          return res.send(err);
        }
        return res.status(201).json(updateProfileResponse(pilot || {}, _host));
      });
    })
    .patch(
      passport.authenticate("jwt", { session: false }),
      checkUser,
      async (req, res) => {
        const _host = req.protocol + "://" + req.get("host") + "/";
        // console.log(req.user._id, req.params.id);
        const _newUser = await updateProfileAvatar(req.body, _host);
        Pilot.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { ..._newUser } },
          { new: true },
          (err, pilot) => {
            if (err) {
              return res.send(err);
            }
            if (!pilot) {
              return res.status(404).json();
            }
            return res.status(201).json(updateProfileResponse(pilot, _host));
          }
        );
      }
    )
    .delete();

  return pilotRouter;
};

module.exports = pilotRoutes;
