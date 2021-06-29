import {GoogleLogin} from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";
import {withCookies} from 'react-cookie';
import SuperfriendsBackendClientInstance from '../../services/SuperfriendsBackendClient'

class GoogleSignIn extends React.Component {

    superfriendsBackendClient = SuperfriendsBackendClientInstance

    fail =  (e) => {
        console.log(e);
        alert("Auth failed with google")
    }
    
    onLoginSuccess = async (response) => {
        console.log(response);
        const userInfo = response.profileObj;
        const userInfoDto = {
            "name": userInfo.name,
            "email": userInfo.email,
            "image_url": userInfo.imageUrl,
            "google_id": userInfo.googleId,
            "token_id": response.tokenId
        }

        const loginResponse = await this.superfriendsBackendClient.postLogin(userInfoDto);
        this.props.handleSignIn(userInfoDto, loginResponse["access_token"]);
    }

    render() {
        return (
            <GoogleLogin
                className="button-size-lg"
                clientId='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com'
                buttonText="Continua con Google"
                onSuccess={this.onLoginSuccess}
                onFailure={this.fail}
                cookiePolicy={'http://ec2-13-51-45-140.eu-north-1.compute.amazonaws.com'}
                isSignedIn={false}
            />
        )
    }
}

export default withCookies(GoogleSignIn);
