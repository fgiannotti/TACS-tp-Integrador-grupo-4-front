import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Divider} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import MediaCard from "../cards/HeroCard";
import DialogContentText from '@material-ui/core/DialogContentText';
import '../../styles/Game.css';

export default class SimpleResultDialog extends Component {

    handleCancel = () =>{
        this.props.onClose("");
    };
    render() {
        return (
            <div>
                <Dialog onClose={this.handleCancel} fullWidth={true} aria-labelledby="simple-dialog-title" open={this.props.open} color="orange">
                    <DialogTitle id="simple-dialog-title">{this.props.tie ? "¡Empataron!" : "Gano " + this.props.winner + "!"}  </DialogTitle>
                    <Grid item xs={12} className="root">
                        <Grid>
                            <DialogTitle id="simple-dialog-title" style={{textAlign:'center'}}>this.props.data.mainUser.username</DialogTitle>
                            <DialogContentText style={{textAlign:'center'}}> this.props.data.result.attribute : this.props.data.mainUser.attribute</DialogContentText>
                            <div className="result-card">
                                <MediaCard  card={this.props.cards[0]}/>
                            </div>
                        </Grid>
                        <Divider style={{marginTop:'16px',minWidth:'100%'}}/>
                        <Grid>
                            <DialogTitle id="simple-dialog-title" style={{textAlign:'center'}} >this.props.data.opponent.username</DialogTitle>
                            <DialogContentText style={{textAlign:'center'}}> this.props.data.result.attribute : this.props.data.opponent.attribute</DialogContentText>
                            <div className="result-card">
                                <MediaCard card={this.props.cards[1]}/>
                            </div>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}
