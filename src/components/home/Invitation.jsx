import React from 'react'
import { Redirect } from "react-router";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from '../../styles/Home.css';
export default class Invitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            matchInvited: this.props.invitation.matchId,
            redirectToLobby: false
        }

        console.log(this.state);
    }
    handleMatchRefuse = () => {
        console.log("set state")
        this.setState({open:false})
        //mandarle algo al otro tipo de que le rechazaron la partida?
    }
    handleMatchAccept = () => {
        //ACEPTÓ PÁ, LLEVAMELO A JUGAR
        this.setState({redirectToLobby: true})
    }

    render() {
        if (this.state.redirectToLobby) return (<Redirect to={"/lobby?matchId=" + this.state.matchInvited}/>)
        return (
            <div>
                <Dialog open={this.state.open} fullWidth={true} className={styles.center} onClose={this.handleMatchRefuse} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Invitacion!"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Te estan invitando a una partida!
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleMatchRefuse} color="primary" autoFocus>
                        Rechazar
                    </Button>
                    <Button onClick={this.handleMatchAccept} color="secondary" autoFocus>
                        Aceptar
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
