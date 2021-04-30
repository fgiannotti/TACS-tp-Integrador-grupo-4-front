import React from "react";
import {Redirect, Route} from "react-router";

const PrivateRoute = props => {
    if (!props.isSignedIn) return <Redirect to={"/login"}/>
    return <Route {...props}/>
}

export default PrivateRoute
