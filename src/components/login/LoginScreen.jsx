import React from 'react';
import GoogleSignIn from './Google';
import Card from '@material-ui/core/Card';
import {CardActions, CardContent, Typography} from "@material-ui/core";
import '../../styles/CommonLayoutsFlex.css'
import '../../styles/CommonStyles.css'
import '../../styles/Card.css'

class LoginScreen extends React.Component {

    render() {
        return (
            <div className="flex-column-center">
                <Card className="p1 card">
                    <Typography variant="h4" component="h3" className="m2 font">
                        Juego de cartas Superamigos
                    </Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Juego de cartas para 2 jugadores de las viejas Cartas Cromy
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <GoogleSignIn/>
                    </CardActions>
                </Card>
            </div>
        )
    }
};

export default LoginScreen;
