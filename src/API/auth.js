import request from "../utils/request";

export const logIn = (data) => {
  return request({
    url: "auth/login",
    method: "post",
    data,
  });
};

export const logout = () => {
  return request({
    url: "auth/logout",
    method: "post",
  });
};
