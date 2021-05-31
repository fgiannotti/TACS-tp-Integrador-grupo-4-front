import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Divider} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import MediaCard from "../cards/HeroCard";
import DialogContentText from '@material-ui/core/DialogContentText';
import '../../styles/Game.css';

export default class SimpleResultDialog extends Component {
    attributeNameToSpanish = (attribute) => {
        switch (attribute.toUpperCase()) {
            case "WEIGHT": return "Peso"
            case "HEIGHT": return "Altura"
            case "SPEED": return "Velocidad"
            case "COMBAT": return "Combate"
            case "INTELLIGENCE": return "Inteligencia"
            case "POWER": return "Poder"
            case "STRENGTH": return "Fuerza"
            default: return ""
        }
    }

    getAttributeValue = (card,attributeChosen) => {
        return card.power_stats.find(stat => stat.name.toUpperCase() === attributeChosen.toUpperCase()).value
    }
    handleCancel = () => { this.props.onClose("") }
    render() {
        console.log("movement in simple result dialog" + this.props.movement.winner_card.name)
        return (
            <div>
                <Dialog onClose={this.handleCancel} fullWidth={true} aria-labelledby="simple-dialog-title" open={this.props.open} color="orange">
                    <DialogTitle id="simple-dialog-title">{this.props.tie ? "¡Empataron!" : "Gano " + this.props.winnerName + "!"}  </DialogTitle>
                    <DialogContentText style={{textAlign:'center'}}> {"Atributo elegido:  " + this.attributeNameToSpanish(this.props.attribute)}</DialogContentText>
                    <Grid item xs={12} className="root">
                        <Grid>
                            <DialogTitle id="simple-dialog-title" style={{textAlign:'center'}}>{this.props.winnerName}</DialogTitle>
                            <DialogContentText style={{textAlign:'center'}}> {this.attributeNameToSpanish(this.props.attribute)+": " + this.getAttributeValue(this.props.movement.winner_card,this.props.attribute)}</DialogContentText>
                            <div className="result-card">
                                <MediaCard  card={this.props.movement.winner_card}/>
                            </div>
                        </Grid>

                        <Divider style={{marginTop:'16px',minWidth:'100%'}}/>

                        <Grid>
                            <DialogTitle id="simple-dialog-title" style={{textAlign:'center'}} >{this.props.loserName} </DialogTitle>
                            <DialogContentText style={{textAlign:'center'}}> {this.attributeNameToSpanish(this.props.attribute)+": " + this.getAttributeValue(this.props.movement.loser_card,this.props.attribute)}</DialogContentText>
                            <div className="result-card">
                                <MediaCard card={this.props.movement.loser_card}/>
                            </div>
                        </Grid>
                    </Grid>
                </Dialog>
            </div>
        )
    }
}
