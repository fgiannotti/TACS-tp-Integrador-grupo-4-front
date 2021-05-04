import React from "react";
import {Redirect, Route} from "react-router";

const ProtectedRoute = ({ component: Comp, isSignedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return isSignedIn ? <Comp {...props} /> : <Redirect to="/login" />;
        }}
      />
    );
};

export default ProtectedRoute;