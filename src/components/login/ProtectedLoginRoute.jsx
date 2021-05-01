import React from "react";
import {Redirect, Route} from "react-router";

const ProtectedLoginRoute = ({ component: Comp, isSignedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return isSignedIn ? <Redirect to="/" /> : <Comp {...props} />;
        }}
      />
    );
};

export default ProtectedLoginRoute;