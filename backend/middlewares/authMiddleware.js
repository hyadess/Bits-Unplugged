// middleware.js
const passport = require("passport");

const requiresRole = (expectedRole) => {
  return (req, res, next) => {
    if (req.user.type != expectedRole) {
      res.status(401).send({ error: "Unauthorized access" });
      return;
    }
    next();
  };
};

const authenticateJWT = passport.authenticate("jwt", {
  failureRedirect: "/invalid",
  session: false,
});

const requiresAdmin = requiresRole(2);
const requiresSetter = requiresRole(1);
const requiresUser = requiresRole(0);

module.exports = {
  requiresAdmin,
  requiresSetter,
  requiresUser,
  authenticateJWT,
};
