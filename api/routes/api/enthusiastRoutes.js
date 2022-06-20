const express = require("express");

const enthusiastRoutes = (Enthusiast) => {
  const enthusiastRouter = express.Router();

  enthusiastRouter
    .route("/")
    .get((req, res) => {
      Enthusiast.find((err, enthusiasts) => {
        if (err) {
          return res.send(err);
        }
        const returnenthusiasts = enthusiasts.map((enthusiast) => {
          const newEnthusiast = enthusiast.toJSON();
          delete newEnthusiast.password;
          delete newEnthusiast._id;
          delete newEnthusiast.__v;
          return newEnthusiast;
        });
        return res.status(201).json(returnenthusiasts);
      });
    })
    .post((req, res) => {
      const enthusiast = new enthusiast(req.body);
      enthusiast.save((err) => console.log(err));
      return res.status(201).json(enthusiast);
    });

  enthusiastRouter
    .route("/:email")
    .get((req, res) => {
      Enthusiast.findOne({ email: req.params.email }, (err, enthusiast) => {
        if (err) {
          return res.send(err);
        }
        const newEnthusiast = enthusiast.toJSON();
        delete newEnthusiast.password;
        delete newEnthusiast._id;
        delete newEnthusiast.__v;
        return res.status(201).json(newEnthusiast);
      });
    })
    .patch((req, res) => {
      Enthusiast.findOneAndUpdate(
        { username: req.params.username },
        { $set: req.body },
        { new: true },
        (err, enthusiast) => {
          if (err) {
            return res.send(err);
          }
          if (!enthusiast) {
            return res.status(404).json({
              code: "auth/user-not-found",
              message: "user with given email does not exist",
            });
          }
          const newEnthusiast = enthusiast.toJSON();
          delete newEnthusiast.password;
          delete newEnthusiast._id;
          delete newEnthusiast.__v;
          return res.status(201).json(newEnthusiast);
        }
      );
    })
    .delete((req, res) => {
      Enthusiast.findOneAndDelete(
        { email: req.body.email },
        (err, enthusiast) => {
          if (err) {
            return res.send(err);
          }
          if (!enthusiast) {
            return res.status(404).json({
              code: "auth/user-not-found",
              message: "user with given email does not exist",
            });
          }
          return res.status(201).json({
            status: "successfull",
            message: `Account for ${enthusiast.name} of email ${enthusiast.email} has been succesfully deleted`,
          });
        }
      );
    });

  return enthusiastRouter;
};

module.exports = enthusiastRoutes;
