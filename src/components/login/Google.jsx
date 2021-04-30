import GoogleLogin from 'react-google-login';
import '../../styles/CommonStyles.css'
import React from "react";

class GoogleSignIn extends React.Component {

    fail() {
        console.log("Auth failed with google")
    }

    handleSignIn = () => {
        console.log("executing")
        this.props.handleSignIn()
    }

    render() {
        return (
            <GoogleLogin
                className="button-size-lg"
                clientId='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com'
                buttonText="Continua con Google"
                onSuccess={this.handleSignIn}
                onFailure={this.fail}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
            />
        )
    }
}

export default GoogleSignIn;
