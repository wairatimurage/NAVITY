const express = require("express");
const { verifyAdmin, checkAuth } = require("../../utilities/utility");
const { v4: uuidv4 } = require("uuid");
const { tinifyImage } = require("../../utilities/tinify");
const { uploadFile } = require("../../utilities/s3Actions");
const path = require("path");
// const fs = require("fs");
const { handleServerErrors } = require("../../utilities/errorHandling");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const updateIdeasResponse = (_post, _host) => {
  let _new = _post.toJSON();
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-unused-vars
    _new.images = _new.images.map((_image, _index) => _host + _image);
  }
  delete _new._id;
  delete _new.__v;
  return _new;
};

const updateIdeasRequestImages = async (_post, host) => {
  let _newImages = _post.images.map(async (_value, _key) => {
    if (
      _value &&
      _value.split("base64").length === 2 &&
      _value.split("://").length !== 2
    ) {
      const imageName = _post.id + "-" + _key + ".png";
      const baseString = _value.split("base64,").slice(-1).toString();
      if (process.env.NODE_ENV === "development") {
        await tinifyImage(
          baseString,
          path.join(__dirname, `../images/${imageName}`)
        );
        return imageName;
      } else {
        // eslint-disable-next-line no-unused-vars
        const _location = await uploadFile(baseString, "ideas/" + imageName);
        return process.env.BUCKET_LINK + "ideas/" + imageName;
      }
    }

    if (
      process.env.NODE_ENV === "development" &&
      _value.split("://").length > 1
    ) {
      return _value.replace(host, "");
    }
  });

  return Promise.all(_newImages).then((_res) => {
    _post.images = _res;
    return _post;
  });
};

// const deleteImages = async (_images, _host) => {
//   try {
//     for (const [_key, _value] of Object.entries(_images)) {
//       if (_key !== "defaultImage") {
//         if (process.env.NODE_ENV === "development") {
//           _newValue = _value.replace(_host, "");
//           const imagePath = path.join(__dirname, "../images/" + _newValue);
//           fs.unlinkSync(imagePath);
//         } else {
//           _newValue = _value.replace(process.env.BUCKET_LINK, "");
//           await deleteFile();
//         }
//       }
//       // TODO: s3 delete
//     }
//   } catch (_err) {
//     handleServerErrors(_err);
//   }
// };
const ideasRouter = (Ideas) => {
  const ideasRoutes = express.Router();

  ideasRoutes
    .route("/")
    .get((req, res) => {
      const _host = req.protocol + "://" + req.get("host") + "/";
      Ideas.findall()
        .then((_posts) => {
          const _newIdeas = _posts.map(
            async (_post) => await updateIdeasResponse(_post, _host)
          );
          res.status(201).json(_newIdeas);
        })
        .catch((_err) => {
          console.log(_err);
          res.status(500).json({
            errorMessage: "Sorry, an error occured. Please try again",
          });
        });
    })
    .post(checkAuth, verifyAdmin, async (req, res) => {
      try {
        const _alreadyExists = await Ideas.findAll({
          where: {
            title: req.body.title,
          },
        }).then((_res) => _res);
        if (_alreadyExists.length) {
          res
            .status(404)
            .json({ errorMessage: "Sorry the title has already been used." });
        } else {
          const _host = req.protocol + "://" + req.get("host") + "/";
          const _id = uuidv4();
          const _newIdea = new Ideas(
            await updateIdeasRequestImages({ id: _id, ...req.body }, _host)
          );
          _newIdea.save().then((_saved) => {
            console.log(_saved);
            res
              .status(200)
              .json({ message: "New Article successfully saved." });
          });
        }
      } catch (_err) {
        handleServerErrors(_err);
        res.status(500).json({
          errorMessage: "Sorry, an error occured. Please try again.",
        });
      }
    })
    .patch(checkAuth, verifyAdmin, async (req, res) => {
      const checkAlreadyExists = (_list) => {
        if (_list.length) {
          const _sameItem = _list.filter((_itm) => _itm.id === req.body.id);
          return !_sameItem.length;
        }
        return false;
      };
      try {
        const _alreadyExists = await Ideas.find({
          title: req.body.title,
        }).then((_res) => _res);

        if (checkAlreadyExists(_alreadyExists)) {
          res.status(404).json({
            errorMessage: "Sorry the title has already been used.",
          });
        } else {
          const _host = req.protocol + "://" + req.get("host") + "/";

          const _newIdea = await updateIdeasRequestImages(
            { ...req.body },
            _host
          );

          Ideas.findOne({
            where: {
              id: req.body.id,
            },
          }).then((_idea) => {
            if (_idea) {
              _idea.update({ ..._newIdea }).then((_saved) => {
                console.log(_saved);
                res
                  .status(200)
                  .json({ message: "Article successfully updated." });
              });
            }
          });
        }
      } catch (_err) {
        handleServerErrors(_err);
        res.status(500).json({
          errorMessage: "Sorry, an error occured. Please try again.",
        });
      }
    });
  // .delete(checkAuth, verifyAdmin, (req, res) => {
  //   // TODO: delete func
  // });

  ideasRoutes.route("/published").get((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
    Ideas.findAll()
      .then((_posts) => {
        const _newIdeas = _posts
          .filter((_post) => _post.status === "published")
          .map((_post) => {
            return updateIdeasResponse(_post, _host);
          });

        res.status(201).json(_newIdeas);
      })
      .catch((_err) => {
        console.log(_err);
        res.status(500).json({
          errorMessage: "Sorry, an error occured. Please try again",
        });
      });
  });
  ideasRoutes.route("/draft").get((req, res) => {
    const _host = req.protocol + "://" + req.get("host") + "/";
    Ideas.findAll()
      .then((_posts) => {
        const _newIdeas = _posts
          .filter((_post) => _post.status === "draft")
          .map((_post) => {
            return updateIdeasResponse(_post, _host);
          });

        res.status(201).json(_newIdeas);
      })
      .catch((_err) => {
        console.log(_err);
        res.status(500).json({
          errorMessage: "Sorry, an error occured. Please try again",
        });
      });
  });
  ideasRoutes.route("/top-rated").get((req, res) => {
    // TODO: top rated
    Ideas.findAll()
      .then((ideas) => {
        const _host = req.protocol + "://" + req.get("host") + "/";
        const _newIdeas = ideas
          .map((_post) => updateIdeasResponse(_post, _host))
          .slice(0, 12);
        return res.status(200).json(_newIdeas);
      })
      .catch((err) => {
        console.log("error", err);
        return res.json({ message: err.message });
      });
  });

  ideasRoutes.route("/star").patch(checkAuth, (req, res) => {
    Ideas.findOne({ where: { _id: req.body._id } }).then((_ideas) => {
      if (_ideas) {
        _ideas
          .update({
            stars: (req.body.stars += 1),
          })
          .then((_res) => {
            console.log(_res);
            res.status(201).json({ message: "Succesfully starred." });
          })
          .catch((_err) => {
            handleServerErrors(_err);
            res.status(500).json({
              errorMessage: "Sorry, an error occured. Please try again.",
            });
          });
      }
    });
  });

  ideasRoutes.route("/:title").get((req, res) => {
    Ideas.findOne({
      where: {
        title: new RegExp("\\b" + req.params.title + "\\b", "i"),
      },
    })
      .then((_post) => res.status(201).json(_post))
      .catch((_err) => {
        handleServerErrors(_err);
        res.status(500).json({
          errorMessage: "Sorry, an error occured. Please try again.",
        });
      });
  });
  // .patch(checkAuth, verifyAdmin, async (req, res) => {
  //   //   TODO: update article
  // });

  return ideasRoutes;
};

module.exports = ideasRouter;
