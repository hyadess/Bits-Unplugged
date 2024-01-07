import axios from "axios";
import { API_BASE_URL } from "../index";
import Api from "./base";

class AuthApi extends Api {
  signup = async (data) => {
    try {
      let res = await axios.post(API_BASE_URL + "/auth/signup", data);
      return {
        success: true,
      };
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        return err.response.data;
      } else {
        return {
          success: false,
          error: "Can't connect to server",
        };
      }
    }
  };

  login = async (data) => {
    try {
      let res = await axios.post(API_BASE_URL + "/auth/login", data);
      return {
        success: true,
        token: res.data.access_token,
      };
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        return err.response.data;
      } else {
        return {
          success: false,
          error: "Can't connect to server",
        };
      }
    }
  };
}
export default AuthApi;
