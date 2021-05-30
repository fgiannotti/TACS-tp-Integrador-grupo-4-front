import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {ButtonGroup} from "@material-ui/core";
import LoseImage from "../../resources/images/losing.gif";
import WinImage from "../../resources/images/winning.png";
import TieImage from "../../resources/images/tie.png";
import MediaCard from "../cards/HeroCard";
import DialogContentText from '@material-ui/core/DialogContentText';
import { withSnackbar } from "./GameSnackBar";
import {Redirect} from "react-router"
import ManagementSocket from "../management_socket/ManagementSocket";
import './Game.css'
import SimpleResultDialog from "./SimpleResultDialog"
import FormRow from "./FormRow"
import SimpleCardDialog from "./SimpleCardDialog"
class Game extends React.Component {
    constructor(props) {
        super(props);
        let userMain = props.data.usuarios.find((user)=>user.username===props.mainUser);
        let userOpponent = props.data.usuarios.find((user)=>user.username!== props.mainUser);
        const card = userMain.cartaActual;
        var deckCount;

        this.state = {
            card: card,
            openCard: false,
            openMatchResult: false,
            openResult: false,
            attribute: "",
            userOpponent: userOpponent,
            userMain: userMain
        }

    }



    componentDidMount() {
    ManagementSocket.subscribeObserver(this)
        ManagementSocket.sendMessage("CONNECT GAME")
    }

    receiveMessage = (message) =>{
        if(message.contain("INIT")){
            let messagejson = JSON.parse(message)
            let userMain = messagejson.creator
            let userOpponent = messagejson.opponent
            let deckCount = messagejson.deckCount
        }
        console.log(message)

    }
    handleClickOpenCard = () => {
        this.setState({openCard: true});
    };
    handleCloseResult = () =>{
        this.setState({openResult: true, openMatchResult: true});
    }

    handleCloseCard = (value) => {
        let openResult = value !== "" ? true : false
        this.setState({attribute: value, openCard: false, openResult: openResult});
        //setear atributo y llamar al back
    };

    handleCloseMatchResult = () => {
        this.setState({openMatchResult: false});
        return <Redirect push to="/" />
    }
    
    setAttribute(){
        if (this.props.mainUser === this.props.data.turno){
            return (
                <React.Fragment>
                    <Button variant="contained" onClick={this.handleClickOpenCard}>Seleccionar atributo</Button>
                    <SimpleCardDialog selectedValue={this.state.attribute} open={this.state.openCard} onClose={this.handleCloseCard} />
                </React.Fragment>);
        }
    }

    SimpleDialogResult(variable) {
        const { onClose, open, data } = variable;
        const handleCancel = () =>{
            onClose("");
            //props.snackbarShowMessage("Es turno de tu contrincante")
        };
        return (
            <Dialog onClose={handleCancel} aria-labelledby="simple-dialog-title" open={open} color="orange">
                <DialogTitle id="simple-dialog-title" className="center">{data.result.event} {data.result.user}</DialogTitle>

                <Grid container xs={12} className="root">
                <Grid item spacing={1} className="mainUserResult">
                    <DialogTitle id="simple-dialog-title" className="center">{data.mainUser.username}</DialogTitle>
                    <DialogContentText className="center"> {data.result.attribute} : {data.mainUser.attribute}</DialogContentText>
                    <MediaCard data={this.state.card} /></Grid>
                <Grid item  className="opponentUserResult">
                    <DialogTitle id="simple-dialog-title" className="center">{data.opponent.username}</DialogTitle>
                    <DialogContentText className="center"> {data.result.attribute} : {data.opponent.attribute}</DialogContentText>
                    <MediaCard data={this.state.card}/></Grid>
                </Grid>
            </Dialog>
        );
    }

    turno() {
        if (this.props.data.turno === this.props.mainUser) {
            return (<h3 className="center">Es tu turno</h3>);
        } else {
            return (<h3 className="center">Esperando oponente</h3>);
        }
    }

    MatchResultDialog(props) {
        const {onClose, result_status, open} = props;

        const chooseTittleMessage = () => {
            switch (result_status){
                case 'win':
                    return "GANASTE"
                case 'lose':
                    return "PERDISTE"
                default:
                    return "EMPATE"
            }
        };

        const chooseImage = () => {
            switch (result_status){
                case 'win':
                    return WinImage
                case 'lose':
                    return LoseImage
                default:
                    return TieImage
            }
        };

        const handleCancel = () =>{
            onClose();
        };

        return (
            <Dialog onClose={handleCancel} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">{chooseTittleMessage()}</DialogTitle>
                <img src={chooseImage()} alt={'asd'}/>
                <Button onClick={this.handleCloseMatchResult}>Volver al Lobby</Button>
            </Dialog>
        );

    }

    render() {
        return (

        <div title="Game" className={"root"}>
            {this.turno()}
            <Grid title="Board" container direction="column" justify="flex-start" alignItems="stretch" spacing={3} xs={12}>
                <Grid title="Opponent" container spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className="users">
                        <Avatar alt="Remy Sharp" src={this.state.userOpponent.imageUrl} title={"Username"}/>
                        {this.state.userOpponent.userName}
                    </Grid>
                    <FormRow score={this.state.userOpponent.score} cardsLeft={this.state.deckCount}/>
                </Grid>
                <Grid title="MainUser" container  spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className="users">
                        <Avatar alt="Remy Sharp" src={this.state.userMain.imageUrl} title={"Username"}/>
                        {this.state.userMain.userName}
                    </Grid>
                    <FormRow score={this.state.userMain.score} cardsLeft={this.state.deckCount}/>
                </Grid>
            </Grid>
            <Grid title="Configuration" container alignItems={"flex-end"}>
                <Grid container item xs={"12"} justify={"flex-end"}>
                    {this.state.setAttribute()}
                    <Button variant="contained" >Abandonar</Button>
                </Grid>
            </Grid>
            <SimpleResultDialog/>
            <SimpleResultDialog data={{"result":{"event":"Winner","user":"username1","attribute":"Fuerza"},"mainUser": {"username":"username1", "attribute": "5"},"opponent":{"username":"username2", "attribute": "10"}}} open={openResult} onClose={handleCloseResult} />
            {/*<MatchResultDialog open ={this.openMatchResult} onClose={this.handleCloseMatchResult} result_status="lose"/>*/}
        </div>
        );
    }

}
export default withSnackbar(Game);
