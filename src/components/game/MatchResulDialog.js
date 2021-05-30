import React, {Component} from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import LoseImage from "../../resources/images/losing.gif";
import WinImage from "../../resources/images/winning.png";
import TieImage from "../../resources/images/tie.png";
import Button from "@material-ui/core/Button";
import '../../styles/Game.css';


export default class SimpleResultDialog extends Component {

    constructor(props) {
        super(props);

        this.state = {
            onClose: "asd",
            open: "asd",
            result_type: "adat",

        }
    }

    chooseTittleMessage = () => {
        switch (this.result_type){
            case 'win':
                return "GANASTE"
            case 'lose':
                return "PERDISTE"
            default:
                return "EMPATE"
        }
    };

    chooseImage = () => {
        switch (this.result_type){
            case 'win':
                return WinImage
            case 'lose':
                return LoseImage
            default:
                return TieImage
        }
    };


    handleCancel = () =>{
        this.props.onClose();
    };

    render() {
        return (
            <Dialog onClose={this.props.handleCancel} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">{this.chooseTittleMessage()}</DialogTitle>
                <img src={this.chooseImage()} alt={'foto_resultado'}/>
                <Button onClick={this.handleCloseMatchResult}>Volver al Lobby</Button>
            </Dialog>
        );
    }

}