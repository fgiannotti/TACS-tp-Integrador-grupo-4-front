import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MediaCard from "../cards/HeroCard";
import DialogContentText from '@material-ui/core/DialogContentText';
import styles from '../../styles/Game.css';

export default class SimpleResultDialog extends Component {

    handleCancel = () =>{
        this.props.onClose("");
        //props.snackbarShowMessage("Es turno de tu contrincante")
    };
    render() {
        return (
            <div>
                <Dialog onClose={this.handleCancel} aria-labelledby="simple-dialog-title" open={this.props.open} color="orange">
                    <DialogTitle id="simple-dialog-title" className={styles.center}>{this.props.data.result.event} {this.props.data.result.user}</DialogTitle>
                    <Grid container item xs={12} className={styles.root}>
                        <Grid item container spacing={1} className={styles.mainUserResult}>
                            <DialogTitle id="simple-dialog-title" className={styles.center}>{this.props.data.mainUser.username}</DialogTitle>
                            <DialogContentText className={styles.center}> {this.props.data.result.attribute} : {this.props.data.mainUser.attribute}</DialogContentText>
                            <MediaCard card={this.props.card}/>
                        </Grid>
                        <Grid container className={styles.opponentUserResult}>
                            <DialogTitle id="simple-dialog-title" className={styles.center}>{this.props.data.opponent.username}</DialogTitle>
                            <DialogContentText className={styles.center}> {this.props.data.result.attribute} : {this.props.data.opponent.attribute}</DialogContentText>
                            <MediaCard card={this.props.card}/>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}
