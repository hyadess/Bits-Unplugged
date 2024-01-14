import axios from "axios";
import Cookies from "universal-cookie";
import { API_BASE_URL } from "../index";
const cookies = new Cookies();

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    let originalRequest = error.config;
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    console.log("Retry:", originalRequest._retry);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log("Retry:", originalRequest._retry);
      try {
        const res = await axios.post(API_BASE_URL + "/auth/refresh");
        // const { token, type } = response.data;
        const token = res.data.access_token;
        // console.log("yeeeeeeeeeeeeeeeeeee", response.data);
        localStorage.setItem("token", res.data.access_token);
        // localStorage.setItem("type", type);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.log("Redirect to login");
        localStorage.removeItem("token");
        localStorage.removeItem("type");
        window.location.href = "/login?type=solver";
      }
    }
    return Promise.reject(error);
  }
);

export default class Api {
  getToken = () => {
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoyLCJpYXQiOjE2OTM0MjQ2MzN9.y_2W8PFdUYlbQ316GtufzsuN_tlVRwsmZwbPKzbyifc";
    const token = localStorage.getItem("token");
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
      const res = await axios.get(API_BASE_URL + url);
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
      const res = await axios.post(API_BASE_URL + url, body);
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
      const res = await axios.put(API_BASE_URL + url, body);
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
      const res = await axios.delete(API_BASE_URL + url);
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
