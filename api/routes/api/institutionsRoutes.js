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
    Institution.findAll()
      .then((institutions) => {
        const returnInstitutions = institutions.map((institution) =>
          updateProfileResponse(institution, _host)
        );
        return res.status(201).json(returnInstitutions);
      })
      .catch((err) => {
        return res.send(err);
      });
  });
  // .post((req, res) => {
  //   const institution = new institution(req.body);
  //   Institution.save((err) => console.log(err));
  //   return res.status(201).json(institution);
  // });

  institutionRouter.route("/inquiry").post(async (req, res) => {
    Institution.findOne({ where: { email: req.body.email } }).then(
      (_institution) => {
        if (_institution) {
          _institution
            .update({ ...req.body })
            .then((_res) => {
              console.log("ss: ", _res);
              return res.status(201).json(_res);
            })
            .catch((_err) => {
              console.log("sss: ", _err);
              res.send(_err);
            });
        }
      }
    );
  });

  institutionRouter.route("/search").post((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
    Institution.findAll({
      where: {
        name: { $regex: req.body.searchQuery, $options: "ixm" },
      },
    })
      .then((institutions) => {
        if (!institutions) {
          const returning = handleResponseErrors("invalidUser");
          return res.status(returning.status).json(returning.returnValue);
        }
        const returnInstitutions = institutions.map((institution) =>
          updateProfileResponse(institution, _host)
        );
        res.status(201).json(returnInstitutions);
      })
      .catch((err) => {
        return res.send(err);
      });
  });

  institutionRouter.route("/filter").post((req, res) => {
    // TODO: Filter by location, reviews and services
    Institution.findAll({ where: { locations: [req.body.locations] } })
      .then((institutions) => {
        res.status(201).res.json(institutions);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  institutionRouter
    .route("/:id")
    .get((req, res) => {
      const _host = req.protocol + "://" + req.get("host") + "/";
      Institution.findOne({ where: { id: req.params.id } })
        .then((institution) => {
          if (!institution) {
            return res.send("an errror occured");
          }

          return res
            .status(201)
            .json(updateProfileResponse(institution, _host));
        })
        .catch((err) => {
          return res.send(err);
        });
    })
    .patch(
      passport.authenticate("jwt", { session: false }),
      checkUser,
      async (req, res) => {
        const _host = req.protocol + "://" + req.get("host") + "/";

        const _newUser = await updateProfileAvatar(req.body, _host);
        Institution.findOne({ where: { _id: req.params.id } }).then(
          (_institution) => {
            if (_institution) {
              _institution
                .update({ ..._newUser })
                .then((institution) => {
                  if (!institution) {
                    return res.status(404).json({
                      code: "auth/user-not-found",
                      message: "user with given email does not exist",
                    });
                  }
                  return res
                    .status(201)
                    .json(updateProfileResponse(institution, _host));
                })
                .catch((err) => {
                  return res.send(err);
                });
            }
          }
        );
      }
    )
    .delete();

  return institutionRouter;
};

module.exports = institutionRoutes;
