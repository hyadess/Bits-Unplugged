const Controller = require("./base");
const AuthRepository = require("../repository/authRepository");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ADMIN_PASS } = require("../config/config");

const ACCESS_TOKEN_EXPIRATION = 3600;
const REFRESH_TOKEN_EXPIRATION = 86400;
class AuthController extends Controller {
  constructor() {
    super();
  }

  getAccessToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        id: id,
        email: email,
        pass: pass,
        type: type,
      },
      JWT_SECRET,
      { expiresIn: `${ACCESS_TOKEN_EXPIRATION}s` }
    );
    return token;
  };

  getRefreshToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        id: id,
        email: email,
        pass: pass,
        type: type,
      },
      JWT_SECRET,
      { expiresIn: `${REFRESH_TOKEN_EXPIRATION}s` }
    );
    return token;
  };

  getAdminToken = (req, res) => {
    const token = jwt.sign(
      {
        type: 2,
      },
      JWT_SECRET
    );
    return res.status(200).json({
      success: true,
      token: token,
    });
  };

  signup = async (req, res) => {
    req.body["hashPass"] = bcrypt.hashSync(req.body.pass, 10);
    let result = await authRepository.signup(req.body);
    if (result.success) {
      if (result.error) {
        console.log(result.error);
        res.status(409).json({ error: result.error });
      } else {
        res.status(201).json();
      }
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  tokenValidity = async (id, email, pass, type) => {
    var emailFormat =
      /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    let result;
    if (email !== "" && email.match(emailFormat)) {
      result = await authRepository.getUserByEmailType(email, type);
    } else {
      result = await authRepository.getUserByNameType(email, type);
    }

    if (result.success && result.data.length > 0) {
      if (result.data[0].auth_id == id && result.data[0].hashpass == pass) {
        return true;
      }
    } else {
      // return {
      //   success: false,
      //   error: "Invalid credentials",
      // };
      return false;
    }
  };

  login = async (req, res) => {
    try {
      var emailFormat =
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

      if (req.body.type == 2) {
        if (bcrypt.compareSync(req.body.pass, ADMIN_PASS)) {
          return res.status(200).json({
            access_token: this.getAccessToken(
              -1,
              req.body.email,
              ADMIN_PASS,
              req.body.type
            ),
            token_type: "bearer",
            expires_in: ACCESS_TOKEN_EXPIRATION,
            refresh_token: this.getRefreshToken(
              -1,
              req.body.email,
              ADMIN_PASS,
              req.body.type
            ),
          });
        } else {
          return res.status(404).json({
            success: false,
            error: "Invalid credentials",
          });
        }
      }
      let result;
      if (req.body.email !== "" && req.body.email.match(emailFormat)) {
        result = await authRepository.getUserByEmailType(
          req.body.email,
          req.body.type
        );
      } else {
        result = await authRepository.getUserByNameType(
          req.body.email,
          req.body.type
        );
      }

      if (result.success) {
        if (result.data.length > 0) {
          if (bcrypt.compareSync(req.body.pass, result.data[0].hashpass)) {
            return res.status(200).json({
              access_token: this.getAccessToken(
                result.data[0].auth_id,
                req.body.email,
                result.data[0].hashpass,
                req.body.type
              ),
              token_type: "bearer",
              expires_in: ACCESS_TOKEN_EXPIRATION,
              refresh_token: this.getRefreshToken(
                result.data[0].auth_id,
                req.body.email,
                result.data[0].hashpass,
                req.body.type
              ),
            });
          } else {
            return res.status(401).json({
              error: "Invalid credentials",
            });
          }
        } else {
          res
            .status(404)
            .json({ error: "User not found with the given email/user name" });
        }
      } else {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = AuthController;
