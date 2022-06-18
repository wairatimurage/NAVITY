// ********* OAUTH STRATEGY CONFIG **********//
// oauth2Strategy.prototype.userProfile = function (accessToken, done) {
//   const options = {
//     url: "http://localhost:3000/oauth2/user_info",
//     headers: {
//       "User-Agent": "request",
//       Authorization: "Bearer " + accessToken,
//     },
//   };

//   request(options, callback);

//   function callback(error, response, body) {
//     if (error || response.statusCode !== 200) {
//       return done(error);
//     }
//     const info = JSON.parse(body);
//     return done(null, info.user);
//   }
// };
// // oauth strategy
// passport.use(
//   "oauth2",
//   new oauth2Strategy(
//     {
//       authorizationURL: "https://localhost:2000/oauth2/authorize",
//       tokenURL: "https://localhost:2000/oauth2/token",
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/auth/login",
//       passReqToCallback: true,
//       pkce: true,
//       state: true,
//     },
//     function (accessToken, refreshToken, params, profile, done) {
//       return authenticateUser(profile.email, profile.password, done);
//     }
//   )
// );
