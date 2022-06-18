const express = require("express");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../utility");
const { handleResponseErrors } = require("./handleResponseCases");

const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const passport = require("passport");


const pathToKey = path.join(__dirname, "../cryptography/id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf-8");
const models = {
  pilot: require("../models/pilotModel"),
  enthusiast: require("../models/enthusiastModel"),
  institution: require("../models/institutionModel"),
};

const issueJwt = (id) => {
  const expiresIn = "2d";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: "RS256",
  });
  return { token: `Bearer ${signedToken}`, expires: expiresIn };
};


const authRoutes = () => {
  const authRouter = express.Router();
  authRouter.route("/login").post(async (req, res) => {
    const user = await getUserByEmail(req.body.email);
    if (!user) {
      const returning = handleResponseErrors("invalidEmail");
      return res.json(returning.returnValue);
    }

    try {
      if (await bcrypt.compare(req.body.password, user.password)) {
        // issue jwt return user with jwt header
        const jwtToken = issueJwt(user._id);
        const returnUser = user.toJSON();
        delete returnUser.password;
        delete returnUser.__v;
        // delete returnUser._id;
        return res.header("Authorization", jwtToken.token).json(returnUser);
      }
      const returning = handleResponseErrors("invalidPassword");
      return res.status(returning.status).json(returning.returnValue);
    } catch (error) {
      console.log(error);
      const returning = handleResponseErrors("authError");
      return res.json(returning.returnValue);
    }
  });

  authRouter.route("/register").post(async (req, res) => {
    try {
      const userExists = await getUserByEmail(req.body.email);
      if (userExists) {
        const returning = handleResponseErrors("userExists");
        return res.json(returning.returnValue).status(returning.status);
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = new models[req.body.accountType]({
        ...req.body,
        password: hashedPassword,
      });
      // TODO: add instance method to generate a new  id
      user.save((err) => console.log("error", err));
      // const jwtToken = issueJwt(user._id);
      const returnUser = user.toJSON();
      delete returnUser.password;
      // delete returnUser._id;
      res.header("Authorization", jwtToken.token).json(returnUser);

    } catch (error) {
      res.json({ error: error.message, code: error.name });
    }
  });

  // eslint-disable-next-line no-unused-vars
  authRouter.route("/logout").delete((req, res) => {
    req.logOut();
  });

  authRouter
    .route("/current-user")
    .get(passport.authenticate("jwt", { session: false }), (req, res) => {
      const returnUser = req.user.toJSON();
      delete returnUser.password;
      delete returnUser.__v;

      return res.status(201).json(returnUser);
    });
  return authRouter;
};

module.exports = authRoutes;
