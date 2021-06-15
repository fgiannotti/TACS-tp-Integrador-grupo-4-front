import { GoogleLogin } from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";
import {withCookies} from 'react-cookie';
import SuperfriendsBackendClient from '../../SuperfriendsBackendClient'

class GoogleSignIn extends React.Component {

    superfriendsBackendClient = new SuperfriendsBackendClient()

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

        const {is_authenticated, is_authorized, is_admin} = loginResponse;
        this.props.handleSignIn(userInfoDto,is_authenticated, is_authorized, is_admin);
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
