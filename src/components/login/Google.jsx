import GoogleLogin from 'react-google-login';
import '../../styles/CommonStyles.css'

const responseGoogle = (response) => {
    console.log(response);
}

const GoogleSignIn = () => {
    return (
        <GoogleLogin
            className="button-size-lg"
            clientId='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com'
            buttonText="Continua con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )
}

export default GoogleSignIn;
