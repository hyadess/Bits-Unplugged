const Controller = require("./base");
const AuthRepository = require("../repository/authRepository");
const { JWT_SECRET } = require("../config/config");
const authRepository = new AuthRepository();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ADMIN_PASS } = require("../config/config");

const tokenExpiryDuration = 86400;
class AuthController extends Controller {
  constructor() {
    super();
  }
  getToken = (id, email, pass, type) => {
    const token = jwt.sign(
      {
        id: id,
        email: email,
        pass: pass,
        type: type,
      },
      JWT_SECRET,
      { expiresIn: `${tokenExpiryDuration}s` }
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
    this.handleResponse(result, res);
  };

  login = async (req, res) => {
    var emailFormat =
      /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (req.body.type == 2) {
      // console.log(ADMIN_PASS);
      if (bcrypt.compareSync(req.body.pass, ADMIN_PASS)) {
        return res.status(200).json({
          success: true,
          token: this.getToken(-1, req.body.email, ADMIN_PASS, req.body.type),
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

    if (result.success && result.data.length > 0) {
      if (bcrypt.compareSync(req.body.pass, result.data[0].hashpass)) {
        return res.status(200).json({
          success: true,
          token: this.getToken(
            result.data[0].auth_id,
            req.body.email,
            result.data[0].hashpass,
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
    // console.log(result);
    res.status(404).json(result);
  };
}

module.exports = AuthController;
