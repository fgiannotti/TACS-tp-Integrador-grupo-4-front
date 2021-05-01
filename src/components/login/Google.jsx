import GoogleLogin from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";
import {withCookies} from 'react-cookie';

const axios = require('axios').default;

class GoogleSignIn extends React.Component {

    fail() {
        console.log("Auth failed with google")
    }

    onLoginSuccess = async (response) => {
        const userInfo = response.profileObj;
        const userInfoDto = {
            "name": userInfo.name,
            "email": userInfo.email,
            "image_url": userInfo.imageUrl,
            "google_id": userInfo.googleId
        }
        const loginResponse = await axios.post("http://localhost:9000/login", userInfoDto)
        const {is_authenticated, is_authorized, is_admin} = loginResponse.data;

        this.props.handleSignIn(is_authenticated, is_authorized, is_admin)
    }

    render() {
        return (
            <GoogleLogin
                className="button-size-lg"
                clientId='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com'
                buttonText="Continua con Google"
                onSuccess={this.onLoginSuccess}
                onFailure={this.fail}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        )
    }
}

export default GoogleSignIn;