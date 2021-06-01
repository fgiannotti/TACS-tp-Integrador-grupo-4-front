import React from 'react';
import GoogleSignIn from './GoogleSignIn';
import {Typography} from "@material-ui/core";
import '../../styles/CommonLayoutsFlex.css'
import '../../styles/CommonStyles.css'
import '../../styles/Card.css'
import background from "../../resources/images/superfriends.jpg";

class LoginScreen extends React.Component {
    render() {
        return (
            <div className="flex-column-center full-height" style={{
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${background})`
            }}>
                <div className="card p1">
                    <Typography variant="h3" component="h3" className="m2 font">
                        Superamigos
                    </Typography>
                    <Typography variant="h4" component="h3" className="m2 font">
                        Juego de cartas
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        Juego de cartas para 2 jugadores de las viejas Cartas Cromy
                    </Typography>
                    <GoogleSignIn handleSignIn={this.props.handleSignIn}/>
                </div>
                { this.props.error && alert("Error al registrarse, intente de nuevo.")}

            </div>
        )
    }
}

export default LoginScreen;
