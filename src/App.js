import React, { Suspense, useMemo, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { getAuth } from "./utils/LocalStorageUtil";
import { AuthUserProvider } from "./utils/AuthUtil";
import Authenticator from "./components/Authenticator";
// import Splash from "./components/Splash";
import LoginPage from "./views/LoginPage";
// import Panel from "./layouts/Panel";
import ErrorPage from "./views/ErrorPage";

import Dashboard from "./Temporary/Dashboard";

const auth = getAuth();

function App() {
  return (
    <BrowserRouter>
      <AuthUserProvider auth={auth}>
        {/* <Suspense fallback={<Splash />}> */}
        <Switch>
          <Route path="/" exact component={Authenticator} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/dashboard" exact component={Dashboard} />
          {/* <Route path="/admin" render={(props) => <Panel {...props} />} />
            <Route path="/user" render={(props) => <Panel {...props} />} /> */}
          <Route path="*" component={ErrorPage} />
        </Switch>
        {/* </Suspense> */}
      </AuthUserProvider>
    </BrowserRouter>
  );
}

export default App;
