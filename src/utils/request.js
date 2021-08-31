import Axios from "axios";

import { getAuth, validateAuth } from "../utils/LocalStorageUtil";
import { Notification } from "./NotificationUtils";

import { BASE_URL } from "../config/constants";

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

//For Request
axiosInstance.interceptors.request.use(
  (config) => {
    let auth = getAuth();
    if (validateAuth(auth)) {
      config.headers["Authorization"] = auth.token;
      config.headers["Accept"] = "application/json";
      config.headers["Content-Type"] = "application/json";
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

//For Response

axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;
    console.log("RESPONSE", res);
    console.log("auth", res.data.Authorization);

    if (res) {
      if (res.message) {
        // Notification.success(res.message);
        console.log(res.message);
      }
      return res;
    }
  },
  (error) => {
    if (error.response) {
      let { data, status } = error.response;
      if (status >= 500) {
        Notification.error("SERVER ERROR");
        return Promise.reject(new Error(data.message || "Error"));
      } else if (status >= 400) {
        try {
          Notification.error(data.message);
        } catch (error) {
          Notification.error(error.message);
        }
        return Promise.reject(new Error(data.message || "Error"));
      } else if (status >= 300) {
        return Promise.reject(new Error(data.message || "Error"));
      } else {
        Notification.error(data.message);
      }
    } else {
      Notification.error(error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
