import React, { Component } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export default class StopMatchDialog extends Component {
    render() {
        return (
            <div>
                <Dialog onClose={this.props.handleCancel} fullWidth={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
                    <DialogTitle id="simple-dialog-title"> La partida ha sido pausada. </DialogTitle>
                    <DialogContentText style={{textAlign:'center'}}> Tu oponente ha abandonado la partida.</DialogContentText>
                    <Button onClick={this.props.onClose}> Volver al Lobby</Button>
                </Dialog>
            </div>
        )
    }
}
