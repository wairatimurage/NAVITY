const passport = require("passport");

const models = {
  pilot: require("../models/pilotModel"),
  enthusiast: require("../models/enthusiastModel"),
  institution: require("../models/institutionModel"),
};

const getUserByEmail = (email) => {
  let _user;
  const searchInCategory = async (category, email) => {
    const handleError = (err) => (err ? err : null);
    await models[category].findOne({ email }, (err, user) => {
      handleError(err);
      if (user && user !== undefined) {
        // eslint-disable-next-line no-unused-vars
        _user = user;
      }
    });
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

const getUserById = (id) => {
  let _user;
  const searchInCategory = async (category, id) => {
    const handleError = (err) => (err ? err : null);
    await models[category].findById(id, (err, user) => {
      handleError(err);
      if (user && user !== undefined) {
        // eslint-disable-next-line no-unused-vars
        _user = user;
      }
    });
    return _user;
  };

  const isPilot = searchInCategory("pilot", id);
  const isInstitution = searchInCategory("institution", id);
  const isEnthusiast = searchInCategory("enthusiast", id);
  return Promise.all([isEnthusiast, isPilot, isInstitution]).then((results) => {
    if (results[0]) {
      return results[0];
    }
  });
};

function checkUser(req, res, next) {
  console.log(req.user._id, req.params.id);
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

module.exports = {
  checkUser,
  getUserByEmail,
  getUserById,
  checkAuth,
};
