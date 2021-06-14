import { GoogleLogin } from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";
import {withCookies} from 'react-cookie';
import SuperfriendsBackendClient from '../../SuperfriendsBackendClient'
import {decodeToken, useJwt} from "react-jwt";

class GoogleSignIn extends React.Component {

    superfriendsBackendClient = new SuperfriendsBackendClient()

    fail =  () => {
        alert("Auth failed with google")
    }
    
    onLoginSuccess = async (response) => {
        console.log("google response:"+response);
        const userInfo = response.profileObj;
        const userInfoDto = {
            "name": userInfo.name,
            "email": userInfo.email,
            "image_url": userInfo.imageUrl,
            "google_id": userInfo.googleId,
            "token_id": response.tokenId
        }

        const loginResponse = await this.superfriendsBackendClient.postLogin(userInfoDto);
        const data = decodeToken(loginResponse["access_token"]);
        this.props.handleSignIn(userInfoDto,data["isAuthenticated"], data["isAuthorized"], data["isAdmin"], loginResponse["access_token"]);
    }

    render() {
        return (
            <GoogleLogin
                className="button-size-lg"
                clientId='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com'
                buttonText="Continua con Google"
                onSuccess={this.onLoginSuccess}
                onFailure={this.fail}
                cookiePolicy={'http://localhost:9000'}
                isSignedIn={false}
            />
        )
    }
}

export default withCookies(GoogleSignIn);
