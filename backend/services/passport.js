const passport = require("passport");
const { JWT_SECRET } = require("../config/config");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;
opts.issuer = "bitsunplugged.onrender.com";

passport.use(
  new JWTStrategy(opts, async (payload, done) => {
    // console.log(payload);
    try {
      done(null, payload);
    } catch (error) {
      done(error, false);
    }
  })
);

// passport.authenticate("jwt", {
//   failureRedirect: "/invalid",
//   session: false,
// });
