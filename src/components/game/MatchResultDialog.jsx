import React, {Component} from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import LoseImage from "../../resources/images/losing.gif";
import WinImage from "../../resources/images/winning.png";
import TieImage from "../../resources/images/tie.png";
import Button from "@material-ui/core/Button";
import '../../styles/Game.css';


export default class MatchResultDialog extends Component {

    chooseTittleMessage = () => {
        switch (this.props.result_status){
            case 'win':
                return "Ganaste!"
            case 'lose':
                return "Perdiste"
            default:
                return "Empate!"
        }
    };

    chooseImage = () => {
        switch (this.props.result_status){
            case 'win':
                return WinImage
            case 'lose':
                return LoseImage
            case 'tie':
                return TieImage
            default:
                return ""
        }
    };


    handleCancel = () =>{
        this.props.onClose();
    };

    render() {
        return (
            <Dialog onClose={this.props.handleCancel} fullWidth={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">{this.chooseTittleMessage()}</DialogTitle>
                <img src={this.chooseImage()} alt={'foto_resultado'}/>
                <Button onClick={this.props.onClose}>Volver al Lobby</Button>
            </Dialog>
        );
    }

}