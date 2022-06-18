// const oauth2Strategy = require("passport-oauth2").Strategy;

const fs = require("fs");
const path = require("path");
// const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const { getUserById } = require("./utility");

const pathToKey = path.join(__dirname, "./cryptography/id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf-8");
const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const initializePassport = (passport) => {
  const authenticateUser = async (payload, done) => {
    const user = await getUserById(payload.sub);
    try {
      // console.log(payload.sub, user._id);
      // console.log(payload.sub.toString() === user._id.toString());
      user ? done(null, user) : done(null, false);
    } catch (error) {
      return done(error, false);
    }
  };

  // passport.use(
  //   new LocalStrategy(
  //     { usernameField: "email", passwordField: "password" },
  //     authenticateUser
  //   )
  // );
  passport.use(new JwtStrategy(options, authenticateUser));

  // strategy config

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => done(null, getUserById(id)));
};

module.exports = initializePassport;
