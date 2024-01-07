import axios from "axios";
import Cookies from "universal-cookie";
import { API_BASE_URL } from "../index";

axios.defaults.withCredentials = true;
export default class Api {
  cookies = new Cookies();
  getToken = () => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoyLCJpYXQiOjE2OTM0MjQ2MzN9.y_2W8PFdUYlbQ316GtufzsuN_tlVRwsmZwbPKzbyifc";
    const token = this.cookies.get("token");
    return token;
  };

  /**
   *
   * @param {String} url
   * @returns {Object} Either { success: true, data: string } or { success: false, error: string }
   */
  get = async (url) => {
    console.log(API_BASE_URL);
    const token = this.getToken();
    // console.log("Profile Called" + token);
    try {
      const res = await axios.get(
        API_BASE_URL + url,
        {
          headers: { authorization: "Bearer " + token },
        },
        { withCredentials: true }
      );
      return {
        success: true,
        data: res.data,
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

  /**
   *
   * @param {String} url
   * @param {Object} body
   * @returns {Object} Either { success: true, data: string } or { success: false, error: string }
   */
  post = async (url, body) => {
    const token = this.getToken();

    try {
      const res = await axios.post(
        API_BASE_URL + url,
        body,
        {
          headers: { authorization: "Bearer " + token },
        },
        { withCredentials: true }
      );
      return {
        success: true,
        data: res.data,
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

  /**
   *
   * @param {String} url
   * @param {Object} body
   * @returns {Object} Either { success: true, data: string } or { success: false, error: string }
   */
  put = async (url, body) => {
    const token = this.getToken();
    try {
      const res = await axios.put(API_BASE_URL + url, body, {
        headers: { authorization: "Bearer " + token },
        withCredentials: true,
      });
      return {
        success: true,
        data: res.data,
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

  /**
   *
   * @param {String} url
   * @returns {Object} Either { success: true, data: string } or { success: false, error: string }
   */
  delete = async (url) => {
    const token = this.getToken();
    try {
      const res = await axios.delete(API_BASE_URL + url, {
        headers: { authorization: "Bearer " + token },
        withCredentials: true,
      });
      return {
        success: true,
        data: res.data,
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
