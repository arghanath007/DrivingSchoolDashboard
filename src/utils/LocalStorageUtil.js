export const setAuth = (auth) => {
  localStorage.setItem("token", JSON.stringify(auth.data.Authorization));
  localStorage.setItem("username", JSON.stringify(auth.data.username));
  localStorage.setItem("name", JSON.stringify(auth.data.name));
  localStorage.setItem("role", JSON.stringify(auth.data.role));

  let userObject = {};

  userObject.token = auth.data.Authorization;
  userObject.username = auth.data.username;
  userObject.name = auth.data.name;
  userObject.role = auth.data.role;

  return userObject;
};

export const getAuth = () => {
  let userObject = {};
  userObject.token = JSON.parse(localStorage.getItem("token"));
  userObject.username = JSON.parse(localStorage.getItem("username"));
  userObject.name = JSON.parse(localStorage.getItem("name"));
  userObject.role = JSON.parse(localStorage.getItem("role"));

  return userObject;
};

export const resetAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("name");
  localStorage.removeItem("role");

  let userObject = {};
  return userObject;
};

export const validateAuth = (auth) => {
  let userObject = {};
  userObject.token = JSON.parse(localStorage.getItem("token"));
  userObject.username = JSON.parse(localStorage.getItem("username"));
  userObject.name = JSON.parse(localStorage.getItem("name"));
  userObject.role = JSON.parse(localStorage.getItem("role"));

  if (
    userObject.token &&
    userObject.username &&
    userObject.name &&
    userObject.role &&
    auth.token === userObject.token &&
    auth.username === userObject.username &&
    auth.name === userObject.name &&
    auth.role === userObject.role
  ) {
    return true;
  }
  return false;
};
