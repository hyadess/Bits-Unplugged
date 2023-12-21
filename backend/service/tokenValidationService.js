const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const AuthRepository = require("../repository/authRepository");

const authRepository = new AuthRepository();

async function tokenValidationMiddleware(req, res, next) {
  // if (req.body.type == 2) {
  //   next();
  // }
  // console.log(req.body);
  const authHeader = req.headers.authorization;
  // console.log(req.headers.authorization);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(403).send({ error: "access denied" });
  // console.log(process.env.JWT_SECRET);
  jwt.verify(token, JWT_SECRET, async (err, data) => {
    // console.log(data);
    if (err) {
      return res.status(403).send({ error: "access denied" });
    } else if ("type" in data && data.type == "2") {
      console.log(data);
      req.body["type"] = data.type;
      next();
    } else {
      if (!("email" in data))
        return res.status(403).send({ error: "access denied" });

      var isValid = await authRepository.tokenValidity(
        data.id,
        data.email,
        data.pass,
        data.type
      ); //checking whether the current password is the same
      if (!isValid) return res.status(403).send({ error: "access denied" });

      req.body["type"] = data.type;
      req.body["user_id"] = data.id;
      req.body["email"] = data.email;
      req.body["pass"] = data.pass;
      next();
    }
  });
}

module.exports = tokenValidationMiddleware;
