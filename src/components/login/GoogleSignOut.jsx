import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";
import '../../styles/CommonStyles.css'
import React from "react";
import { withCookies } from 'react-cookie';


class GoogleSignOut extends React.Component {

    render() {
        return (
        <GoogleLogout
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={this.logout}>
        </GoogleLogout>

      )
    }

    logout = (response) => {
        console.log(response);
        localStorage.clear();
        window.location.href='/login'
    }
}


export default withCookies(GoogleSignOut);