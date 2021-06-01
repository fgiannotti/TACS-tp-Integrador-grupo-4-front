import { GoogleLogout } from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";
import { withCookies } from 'react-cookie';


class GoogleSignOut extends React.Component {

    render() {
        return (
        <GoogleLogout
        clientId='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com'
        buttonText="Logout"
        onLogoutSuccess={this.logout}
        onScriptLoadFailure={this.fail}
        onFailure={this.fail}
        />
      )
    }

    logout = (response) => {
        console.log(response);
        window.location.href='/login'
    }
    
    fail = (event) => {
        console.log(event)
    }
}


export default withCookies(GoogleSignOut);