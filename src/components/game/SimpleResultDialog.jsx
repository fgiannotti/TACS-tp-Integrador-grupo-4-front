import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MediaCard from "../cards/HeroCard";
import DialogContentText from '@material-ui/core/DialogContentText';
import './Game.css'

export default class SimpleResultDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onClose: "asd",
            open: "asd",
            data: "adat",
            card: "card" //userMain.cartaActual...
        }
    }

    handleCancel = () =>{
        this.props.onClose("");
        //props.snackbarShowMessage("Es turno de tu contrincante")
    };
    render() {
        return (
            <div>
                <Dialog onClose={this.props.handleCancel} aria-labelledby="simple-dialog-title" open={this.props.open} color="orange">
                    <DialogTitle id="simple-dialog-title" className="center">{this.state.this.state.data.result.event} {this.state.this.state.data.result.user}</DialogTitle>

                    <Grid container xs={12} className="root">
                        <Grid item spacing={1} className="mainUserResult">
                            <DialogTitle id="simple-dialog-title" className="center">{this.state.data.mainUser.username}</DialogTitle>
                            <DialogContentText className="center"> {this.state.data.result.attribute} : {this.state.data.mainUser.attribute}</DialogContentText>
                            <MediaCard data={this.state.card}/>
                        </Grid>
                        <Grid item  className="opponentUserResult">
                            <DialogTitle id="simple-dialog-title" className="center">{this.state.data.opponent.username}</DialogTitle>
                            <DialogContentText className="center"> {this.state.data.result.attribute} : {this.state.data.opponent.attribute}</DialogContentText>
                            <MediaCard data={this.state.card}/>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}
