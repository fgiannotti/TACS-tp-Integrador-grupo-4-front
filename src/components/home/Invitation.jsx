import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Invitation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        }

        console.log(this.state);
    }
    handleMatchRefuse = () => {
        console.log("set state")
        this.setState({open:false})
        //mandarle algo al otro tipo de que le rechazaron la partida?
    }
    handleMatchAccept = () => {
        //ACEPTO PÁ, LLEVAMELO A JUGAR
    }

    render() {
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.handleMatchRefuse} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Invitacion"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Te estan invitando pá
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
