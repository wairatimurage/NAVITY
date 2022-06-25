const express = require("express");
const passport = require("passport");
const { checkUser } = require("../../utilities/utility");
const { handleResponseErrors } = require("./handleResponseCases");

const institutionRoutes = (Institution) => {
  const institutionRouter = express.Router();

  institutionRouter.route("/").get((req, res) => {
    Institution.find((err, institutions) => {
      if (err) {
        return res.send(err);
      }
      const returnInstitutions = institutions.map((institution) => {
        const newInstitution = institution.toJSON();
        delete newInstitution.password;
        // delete newInstitution._id;
        delete newInstitution.__v;
        return newInstitution;
      });
      return res.status(201).json(returnInstitutions);
    });
  });
  // .post((req, res) => {
  //   const institution = new institution(req.body);
  //   Institution.save((err) => console.log(err));
  //   return res.status(201).json(institution);
  // });

  institutionRouter
    .route("/:id")
    .get((req, res) => {
      console.log(req.params.id);
      Institution.findOne({ _id: req.params.id }, (err, institution) => {
        if (err) {
          return res.send(err);
        }
        if (!institution) {
          return res.send("an errror occured");
        }
        const newInstitution = institution.toJSON();
        delete newInstitution.password;
        // delete newInstitution._id;
        delete newInstitution.__v;
        return res.status(201).json(newInstitution);
      });
    })
    .patch(
      passport.authenticate("jwt", { session: false }),
      checkUser,
      (req, res) => {
        // console.log(req.user._id, req.params.id);
        Institution.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
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
            const newInstitution = institution.toJSON();
            delete newInstitution.password;
            // delete newInstitution._id;
            delete newInstitution.__v;
            return res.status(201).json(newInstitution);
          }
        );
      }
    )
    .delete();

  institutionRouter.route("/search").post((req, res) => {
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
        const returnInstitutions = institutions.map((institution) => {
          const newInstitution = institution.toJSON();
          delete newInstitution.password;
          // delete newInstitution._id;
          delete newInstitution.__v;
          return newInstitution;
        });
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
  return institutionRouter;
};

module.exports = institutionRoutes;
