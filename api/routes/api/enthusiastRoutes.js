const express = require("express");

const enthusiastRoutes = (Enthusiast) => {
  const enthusiastRouter = express.Router();

  enthusiastRouter
    .route("/")
    .get((req, res) => {
      Enthusiast.findAll()
        .then((enthusiasts) => {
          const returnenthusiasts = enthusiasts.map((enthusiast) => {
            const newEnthusiast = enthusiast.toJSON();
            delete newEnthusiast.password;
            delete newEnthusiast._id;
            delete newEnthusiast.__v;
            return newEnthusiast;
          });
          return res.status(201).json(returnenthusiasts);
        })
        .catch((_err) => {
          return res.send(_err);
        });
    })
    .post((req, res) => {
      const enthusiast = { ...req.body };
      Enthusiast.create({
        ...enthusiast,
      })
        .then((enthusiast) => {
          return res.status(201).json(enthusiast);
        })
        .catch((err) => {
          (err) => console.log(err);
        });
    });

  enthusiastRouter
    .route("/:email")
    .get((req, res) => {
      Enthusiast.findOne()
        .then((enthusiast) => {
          const newEnthusiast = enthusiast.toJSON();
          delete newEnthusiast.password;
          delete newEnthusiast._id;
          delete newEnthusiast.__v;
          return res.status(201).json(newEnthusiast);
        })
        .catch((err) => {
          return res.send(err);
        });

      // Enthusiast.findOne({ email: req.params.email }, (err, enthusiast) => {
      //   if (err) {
      //     return res.send(err);
      //   }

      //   const newEnthusiast = enthusiast.toJSON();
      //   delete newEnthusiast.password;
      //   delete newEnthusiast._id;
      //   delete newEnthusiast.__v;
      //   return res.status(201).json(newEnthusiast);
      // });
    })
    .patch((req, res) => {
      Enthusiast.findOne({ where: { username: req.params.username } }).then(
        (_user) => {
          if (_user) {
            _user
              .update({ ...req.body })
              .then((enthusiast) => {
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
              })
              .catch((err) => {
                return res.send(err);
              });
          }
        }
      );

      // Enthusiast.findOneAndUpdate(
      //   { username: req.params.username },
      //   { $set: req.body },
      //   { new: true },
      //   (err, enthusiast) => {
      //     if (err) {
      //       return res.send(err);
      //     }
      //     if (!enthusiast) {
      //       return res.status(404).json({
      //         code: "auth/user-not-found",
      //         message: "user with given email does not exist",
      //       });
      //     }
      //     const newEnthusiast = enthusiast.toJSON();
      //     delete newEnthusiast.password;
      //     delete newEnthusiast._id;
      //     delete newEnthusiast.__v;
      //     return res.status(201).json(newEnthusiast);
      //   }
      // );
    })
    .delete((req, res) => {
      Enthusiast.destroy({ where: { email: req.body.email } })
        .then((enthusiast) => {
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
        })
        .catch((err) => {
          return res.send(err);
        });

      // Enthusiast.findOneAndDelete(
      //   { email: req.body.email },
      //   (err, enthusiast) => {
      //     if (err) {
      //       return res.send(err);
      //     }
      //     if (!enthusiast) {
      //       return res.status(404).json({
      //         code: "auth/user-not-found",
      //         message: "user with given email does not exist",
      //       });
      //     }
      //     return res.status(201).json({
      //       status: "successfull",
      //       message: `Account for ${enthusiast.name} of email ${enthusiast.email} has been succesfully deleted`,
      //     });
      //   }
      // );
    });

  return enthusiastRouter;
};

module.exports = enthusiastRoutes;
