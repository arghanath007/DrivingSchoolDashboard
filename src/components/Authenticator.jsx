import React from "react";
import { Redirect } from "react-router-dom";
import { getAuth } from "../utils/LocalStorageUtil";

const Authenticator = () => {
  const auth = getAuth();
  console.log(auth);
  return (
    <div>
      Validating....
      {auth.token ? <Redirect to={"/dashboard"} /> : <Redirect to="/login" />}
    </div>
  );
};

export default Authenticator;
