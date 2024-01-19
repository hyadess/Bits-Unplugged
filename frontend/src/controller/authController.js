import Cookies from "universal-cookie";
import AuthApi from "../api/authApi";
import Controller from "./base";
import { COOKIE_AGE } from "../index";
import { showToast } from "../App";

class AuthController extends Controller {
  authApi = new AuthApi();
  cookies = new Cookies();

  getType = async () => {
    // const token = this.localStorage.getItem("token");
    // try {
    //   // Decode the JWT token
    //   const decodedToken = jwtDecode(token);
    //   // Access the decoded information
    //   console.log("Decoded Token:", decodedToken);
    // } catch (error) {
    //   console.error("Error decoding token:", error.message);
    // }
  };
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
      localStorage.setItem("type", data.type);
      localStorage.setItem("token", res.data.access_token);
      this.showSuccess("Logged in successfully", res);
    } else {
      showToast(res.error, "error");
    }
    return res;
  };

  logout = async () => {
    const res = await this.authApi.logout();
    if (res.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      showToast("Logged out successfully");
    }
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
