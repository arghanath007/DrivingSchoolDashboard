import React, { Suspense, useMemo, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthUserProvider } from "./utils/AuthUtil";

const auth = getAuth();

function App() {
  return (
    <BrowserRouter>
      <AuthUserProvider auth={auth}>
        <Suspense fallback={<Splash />}>
          <Switch>
            <Route path="/" exact component={Authenticator} />
            <Route path="/login" exact component={LoginPage} />
            <Route
              path="/super_admin"
              render={(props) => (
                <Panel
                  toggleTheme={toggleTheme}
                  isLightTheme={isLightTheme}
                  {...props}
                />
              )}
            />
            <Route
              path="/merchant"
              render={(props) => (
                <Panel
                  toggleTheme={toggleTheme}
                  isLightTheme={isLightTheme}
                  {...props}
                />
              )}
            />
            <Route
              path="/supervisor"
              render={(props) => (
                <Panel
                  toggleTheme={toggleTheme}
                  isLightTheme={isLightTheme}
                  {...props}
                />
              )}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </AuthUserProvider>
    </BrowserRouter>
  );
}

export default App;
