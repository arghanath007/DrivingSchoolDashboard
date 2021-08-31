import { useContext, createContext } from "react";
import { getAuth } from "./localStorageUtil";
import { Redirect, Route } from "react-router-dom";

const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const auth = getAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthUserContext);
};

export const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  console.log(auth.token);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const AuthorizedRoute = ({ component, ...rest }) => {
  const { token } = getAuth();
  console.log(token);
  if (token === null) {
    return <div>Loading....</div>;
  }
  // eslint-disable-next-line eqeqeq
  if (token != true) {
    return <Redirect push to="/login" />;
  }
  return <Route component={component} {...rest} />;
};
