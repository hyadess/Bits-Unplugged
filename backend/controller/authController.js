const Controller = require("./base");
const AuthRepository = require("../repository/authRepository");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ADMIN_PASS } = require("../config/config");
const { serialize } = require("cookie");

const ACCESS_TOKEN_EXPIRATION = 3600;
const REFRESH_TOKEN_EXPIRATION = 86400;
class AuthController extends Controller {
  constructor() {
    super();
  }

  getAccessToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        userId: id,
        email: email,
        pass: pass,
        type: type,
        iss: "bitsunplugged.onrender.com",
      },
      JWT_SECRET,
      {
        expiresIn: `${ACCESS_TOKEN_EXPIRATION}s`,
      }
    );
    return token;
  };

  getRefreshToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        userId: id,
        email: email,
        type: type,
        iss: "bitsunplugged.onrender.com",
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
        iss: "bitsunplugged.onrender.com",
        admin: true,
      },
      JWT_SECRET
    );
    res.status(200).json({
      success: true,
      token: token,
    });
  };

  signup = async (req, res) => {
    try {
      req.body["hashPass"] = bcrypt.hashSync(req.body.pass, 10);
      let user = await authRepository.signup(req.body);
      res.status(201).json();
    } catch (err) {
      console.log(err);
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ error: "Username already exists" });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };

  deleteAccount = async (req, res) => {
    let result = await authRepository.deleteAccount(req.params.userId);
    if (result.success) {
      if (result.data.length > 0) {
        // success
        res.status(204).json();
      } else {
        // known error
        res.status(404).json({ error: "No account with this id" });
      }
    } else {
      // unexpected error
      res.status(500).json(result);
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
      if (result.data[0].userId == id && result.data[0].hashpass == pass) {
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

      let credential;
      if (req.body.email !== "" && req.body.email.match(emailFormat)) {
        credential = await authRepository.getUserByEmailType(
          req.body.email,
          req.body.type
        );
      } else {
        credential = await authRepository.getUserByNameType(
          req.body.email,
          req.body.type
        );
      }

      if (credential) {
        if (bcrypt.compareSync(req.body.pass, credential.hashpass)) {
          const refreshToken = this.getRefreshToken(
            credential.userId,
            req.body.email,
            credential.hashpass,
            req.body.type
          );
          const serializedRefreshToken = serialize(
            "refresh_token",
            refreshToken,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: REFRESH_TOKEN_EXPIRATION,
              path: "/",
            }
          );
          res.setHeader("Set-Cookie", serializedRefreshToken);
          return res.status(200).json({
            access_token: this.getAccessToken(
              credential.userId,
              req.body.email,
              credential.hashpass,
              req.body.type
            ),
            token_type: "bearer",
            expires_in: ACCESS_TOKEN_EXPIRATION,
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = AuthController;
