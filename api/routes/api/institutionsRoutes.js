const express = require("express");
const passport = require("passport");
const {
  checkUser,
  updateProfileAvatar,
  updateProfileResponse,
} = require("../../utilities/utility");
const { handleResponseErrors } = require("./handleResponseCases");

const institutionRoutes = (Institution) => {
  const institutionRouter = express.Router();

  institutionRouter.route("/").get((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
    Institution.find((err, institutions) => {
      if (err) {
        return res.send(err);
      }
      const returnInstitutions = institutions.map((institution) =>
        updateProfileResponse(institution, _host)
      );
      return res.status(201).json(returnInstitutions);
    });
  });
  // .post((req, res) => {
  //   const institution = new institution(req.body);
  //   Institution.save((err) => console.log(err));
  //   return res.status(201).json(institution);
  // });

  institutionRouter.route("/inquiry").post(async (req, res) => {
    Institution.findOneAndUpdate(
      { email: req.body.email },
      { $set: { ...req.body } }
    )
      .then((_res) => {
        console.log("ss: ", _res);
        return res.status(201).json(_res);
      })
      .catch((_err) => {
        console.log("sss: ", _err);
        res.send(_err);
      });
  });
  institutionRouter.route("/search").post((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
    Institution.find(
      {
        name: { $regex: req.body.searchQuery, $options: "ixm" },
      },
      (err, institutions) => {
        if (err) {
          return res.send(err);
        }
        if (!institutions) {
          const returning = handleResponseErrors("invalidUser");
          return res.status(returning.status).json(returning.returnValue);
        }
        const returnInstitutions = institutions.map((institution) =>
          updateProfileResponse(institution, _host)
        );
        res.status(201).json(returnInstitutions);
      }
    );
  });

  institutionRouter.route("/filter").post((req, res) => {
    // TODO: Filter by location, reviews and services
    Institution.find(
      { locations: [req.body.locations] },
      (err, institutions) => {
        if (err) {
          res.send(err);
        }

        res.status(201).res.json(institutions);
      }
    );
  });

  institutionRouter
    .route("/:id")
    .get((req, res) => {
      const _host = req.protocol + "://" + req.get("host") + "/";
      Institution.findOne({ _id: req.params.id }, (err, institution) => {
        if (err) {
          return res.send(err);
        }
        if (!institution) {
          return res.send("an errror occured");
        }

        return res.status(201).json(updateProfileResponse(institution, _host));
      });
    })
    .patch(
      passport.authenticate("jwt", { session: false }),
      checkUser,
      async (req, res) => {
        const _host = req.protocol + "://" + req.get("host") + "/";
        // console.log(req.user._id, req.params.id);
        const _newUser = await updateProfileAvatar(req.body, _host);
        Institution.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { ..._newUser } },
          { new: true },
          (err, institution) => {
            if (err) {
              return res.send(err);
            }
            if (!institution) {
              return res.status(404).json({
                code: "auth/user-not-found",
                message: "user with given email does not exist",
              });
            }
            return res
              .status(201)
              .json(updateProfileResponse(institution, _host));
          }
        );
      }
    )
    .delete();

  return institutionRouter;
};

module.exports = institutionRoutes;
