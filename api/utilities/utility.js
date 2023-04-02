const passport = require("passport");
const fs = require("fs");
const path = require("path");

const { handleServerErrors } = require("./errorHandling");
const { tinifyImage } = require("./tinify");
const { uploadFile } = require("./s3Actions");
const db = require("../models");
const models = {
  pilot: require("../models/pilotModel")(db.sequelize, db.Sequelize),
  enthusiast: require("../models/enthusiastModel")(db.sequelize, db.Sequelize),
  institution: require("../models/institutionModel")(
    db.sequelize,
    db.Sequelize
  ),
};

const getUserByEmail = (email) => {
  let _user;
  const searchInCategory = async (category, email) => {
    const handleError = (err) => (err ? err : null);

    await models[category]
      .findOne({ email })
      .then((user) => {
        if (user && user !== undefined) {
          // eslint-disable-next-line no-unused-vars
          _user = user;
        }
      })
      .catch((err) => handleError(err));
    return _user;
  };

  const isPilot = searchInCategory("pilot", email);
  const isInstitution = searchInCategory("institution", email);
  const isEnthusiast = searchInCategory("enthusiast", email);
  return Promise.all([isEnthusiast, isPilot, isInstitution]).then((results) => {
    if (results[0]) {
      return results[0];
    }
  });
};

const getUserById = (_id) => {
  let _user;
  const searchInCategory = async (category, _id) => {
    const handleError = (err) => (err ? err : null);
    await models[category]
      .findOne({ where: { _id } })
      .then((user) => {
        if (user && user !== undefined) {
          // eslint-disable-next-line no-unused-vars
          _user = user;
        }
      })
      .catch((err) => handleError(err));
    return _user;
  };

  const isPilot = searchInCategory("pilot", _id);
  const isInstitution = searchInCategory("institution", _id);
  const isEnthusiast = searchInCategory("enthusiast", _id);
  return Promise.all([isEnthusiast, isPilot, isInstitution]).then((results) => {
    if (results[0]) {
      return results[0];
    }
  });
};

function checkUser(req, res, next) {
  console.log("user", req.user._id, req.params.id);
  req.user._id.toString() === req.params.id.toString()
    ? next()
    : res
        .status(401)
        .json({ message: "You do not have permision to make this request" });
}

const checkAuth = async (req, res, next) => {
  const _token = req.headers.authorization;
  if (_token.split(" ").length === 2) {
    return passport.authenticate("jwt", { session: false })(req, res, next);
  }
};

const verifyAdmin = (req, res, next) => {
  // TODO:verify account is activated
  if (req.user.role === "admin" && req.user.status === "activated") {
    return next();
  }
  return res.status(401).json({
    errorMessage: "You are not authorized to carry out this activity",
    code: "unAuthorized",
  });
};

const updateProfileAvatar = async (_user, host) => {
  if (_user.avatar) {
    const _dirPath = path.join(__dirname, `../images/avatars`);
    if (
      _user.avatar &&
      _user.avatar.split("base64").length === 2 &&
      _user.avatar.split("://").length !== 2
    ) {
      if (!fs.existsSync(_dirPath)) {
        // check if avatars folder exists and create if null
        fs.mkdirSync(path.join(__dirname, `../images`));
        fs.mkdirSync(_dirPath);
      }
      const baseString = _user.avatar.split("base64,").slice(-1).toString();
      const imageName = _user._id + ".png";
      if (process.env.NODE_ENV === "development") {
        await tinifyImage(
          baseString,
          path.join(__dirname, `../images/avatars/${imageName}`)
        );
        _user.avatar = imageName;
      } else {
        // TODO: try and make response wait for upload file return, try promise.resolve/promise.all before response
        // eslint-disable-next-line no-unused-vars
        const _location = await uploadFile(baseString, "avatars/" + imageName);
        _user.avatar = process.env.BUCKET_LINK + "avatars/" + imageName;
      }
    }
    if (
      process.env.NODE_ENV === "development" &&
      _user.avatar.split("://").length > 1
    ) {
      _user.avatar = _user.avatar.replace(host, "");
    }
  }
  return _user;
};

const updateProfileResponse = (_user, _host) => {
  if (process.env.NODE_ENV === "development") {
    let _new = _user.toJSON();
    _new.avatar = _host + _new.avatar;
    delete _new.password;
    delete _new.__v;
    return _new;
  }
  return _user;
};

const deleteAvatar = (user, _host) => {
  let _avatar = user._avatar;
  try {
    let _newValue = _avatar.replace(_host, "");
    const imagePath = path.join(__dirname, "../images/avatars/" + _newValue);
    fs.unlinkSync(imagePath);
  } catch (_err) {
    handleServerErrors(_err);
  }

  return user;
};
module.exports = {
  checkUser,
  getUserByEmail,
  getUserById,
  checkAuth,
  verifyAdmin,
  deleteAvatar,
  updateProfileAvatar,
  updateProfileResponse,
};
