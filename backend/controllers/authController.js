const Controller = require("./base");
const AuthRepository = require("../repositories/authRepository");
const AuthService = require("../services/authService");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const authService = new AuthService();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { serialize } = require("cookie");
const sendMail = require("../services/email");

const ACCESS_TOKEN_EXPIRATION = 3600;
const REFRESH_TOKEN_EXPIRATION = 86400;
class AuthController extends Controller {
  constructor() {
    super();
  }

  signup = async (req, res) => {
    try {
      let result = await authService.signup(req.body, req.headers.origin);
      if (result.success) {
        res.status(201).json(result.user);
      } else {
        return res.status(409).json({ error: "Username/Email already exists" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  verifyEmail = async (req, res) => {
    try {
      const result = await authService.verifyEmail(req.body.token);
      console.log(result);
      if (result.success) {
        return res.status(200).json({ message: "Email verified successfully" });
      } else {
        console.log("Invalid token");
        return res.status(403).json({ error: "Invalid token" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  deleteAccount = async (req, res) => {
    this.handleRequest(res, async () => {
      console.log(req.params);
      const deletedUser = await authRepository.deleteAccount(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ error: "Account not found" });
      } else {
        res.status(200).json({ message: "Account deleted successfully" });
      }
    });
  };

  refreshToken = async (req, res) => {
    const result = await authService.getNewAccessToken(
      req.cookies.refresh_token
    );
    console.log(result);
    if (result.success) {
      return res.status(200).json({
        access_token: result.accessToken,
      });
    } else {
      const expiredCookie = `refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      res.setHeader("Set-Cookie", expiredCookie);
      return res.status(403).send({ error: "Invalid refresh token" });
    }
  };

  login = async (req, res) => {
    try {
      const result = await authService.login(req.body);
      if (result.success) {
        // Set httpOnly cookie
        const serializedRefreshToken = serialize(
          "refresh_token",
          result.refreshToken,
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
          access_token: result.accessToken,
        });
      } else {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = AuthController;
