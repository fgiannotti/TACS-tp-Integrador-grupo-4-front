import GoogleLogin from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";
import { withCookies } from 'react-cookie';
const axios = require('axios').default;

class GoogleSignIn extends React.Component {

    fail() {
        console.log("Auth failed with google")
    }

    onLoginSuccess = (response) => {
            //TODO: PEGARLE AL BACKEND
            const userInfo = response.profileObj;
            const userInfoDto = {"name": userInfo.name, "email": userInfo.email, "image_url": userInfo.image_url,"google_id": userInfo.google_id}
            axios.post("http://localhost:9000/login",userInfoDto).then(function (response) {
                console.log(response);
                const {isAuthenticated, isAuthorized, isAdmin} = response;
                console.log(isAuthenticated);
                this.props.cookies.set("sessionId",userInfo.googleId,"/")
                this.props.handleSignIn(isAuthenticated,isAuthorized,isAdmin)
              })
              .catch(function (error) {
                console.log(error);
              });
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

export default withCookies(GoogleSignIn);
