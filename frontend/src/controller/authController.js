import Cookies from "universal-cookie";
import AuthApi from "../api/authApi";
import Controller from "./base";
import { COOKIE_AGE } from "../index";
import { showToast } from "../App";

class AuthController extends Controller {
  authApi = new AuthApi();
  cookies = new Cookies();

  /**
   *
   * @param {Object} data - An object containing email, pass, and type properties.
   * @param {string} data.email - The email address.
   * @param {string} data.pass - The password.
   * @param {string} data.type - The type of user (0-Problem Solver, 1-Problem Setter, 2-Admin).
   * @returns {Object} Either { success: true } or { success: false, error: string }
   */
  login = async (data) => {
    const res = await this.authApi.login(data);
    console.log(res);
    if (res.success) {
      this.cookies.set("token", res.token, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      this.cookies.set("type", data.type, {
        path: "/",
        maxAge: COOKIE_AGE,
      });
      this.showSuccess("Logged in successfully", res);
    } else {
      showToast(res.error, "error");
    }
    return res;
  };

  logout = async () => {
    this.cookies.remove("token", { path: "/" });
    this.cookies.remove("type", { path: "/" });
    showToast("Logged out successfully");
  };

  /**
   *
   * @param {Object} data - An object containing username, email, pass, and type properties.
   * @param {string} data.username - The user name.
   * @param {string} data.email - The email address.
   * @param {string} data.pass - The password.
   * @param {string} data.type - The type of user (0-Problem Solver, 1-Problem Setter, 2-Admin).
   * @returns {Object} Either { success: true } or { success: false, error: string }
   */
  signup = async (data) => {
    const res = await this.authApi.signup(data);
    if (res.success) {
      this.showSuccess("New account created", res);
    } else {
      showToast(res.error, "error");
    }
    
    return res;
  };
}
export default AuthController;
