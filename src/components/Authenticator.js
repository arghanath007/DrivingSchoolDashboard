import React from "react";
import { Redirect } from "react-router-dom";
import { getAuth } from "../utils/LocalStorageUtil";

// const Authenticator = () => {
//   const auth = getAuth();
//   const role = auth.role;
//   console.log(auth);
//   return (
//     <div>
//       Validating....
//       {auth.token ? (
//         <Redirect to={`${role}/dashboard`} />
//       ) : (
//         <Redirect to="/login" />
//       )}
//     </div>
//   );
// };

const Authenticator = () => {
  const auth = getAuth();
  // const role = auth.role;
  console.log(auth);
  return (
    <div>
      Validating....
      {auth.token ? <Redirect to={"/dashboard"} /> : <Redirect to="/login" />}
    </div>
  );
};

export default Authenticator;
