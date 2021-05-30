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
import IconButton from "@material-ui/core/IconButton";
import MediaCard from "../cards/HeroCard";
import DialogContentText from '@material-ui/core/DialogContentText';
import { withSnackbar } from "./GameSnackBar";
import {Redirect} from "react-router"
import ManagementSocket from "../management_socket/ManagementSocket";
import styles from '../../styles/Game.css';
import SimpleResultDialog from "./SimpleResultDialog"
import FormRow from "./FormRow"
import MatchResultDialog from "./MatchResulDialog"
import SimpleCardDialog from "./SimpleCardDialog"

class Game extends React.Component {
    constructor(props) {
        super(props);
        let userMain = this.props.data.usuarios.find((user)=>user.userName === this.props.mainUser);
        let userOpponent = this.props.data.usuarios.find((user)=>user.userName !== this.props.mainUser);

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
        console.log(this.state)
    }



    /*componentDidMount() {
    ManagementSocket.subscribeObserver(this)
        ManagementSocket.sendMessage("CONNECT GAME")
    }*/

    receiveMessage = (message) =>{
        if(message.data.includes("INIT")){
            let messagejson = JSON.parse(message.data)
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
    
    chooseAttributeButton(){
        if (this.props.mainUser === this.props.data.turno){
            return (
                <React.Fragment>
                    <Button variant="contained" onClick={this.handleClickOpenCard}>Seleccionar atributo</Button>
                    <SimpleCardDialog card={this.state.card} selectedValue={this.state.attribute} open={this.state.openCard} onClose={this.handleCloseCard} />
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
                <DialogTitle id="simple-dialog-title" className={styles.center}>{data.result.event} {data.result.user}</DialogTitle>

                <Grid container xs={12} className={styles.root}>
                <Grid item spacing={1} className={styles.mainUserResult}>
                    <DialogTitle id="simple-dialog-title" className={styles.center}>{data.mainUser.username}</DialogTitle>
                    <DialogContentText className={styles.center}> {data.result.attribute} : {data.mainUser.attribute}</DialogContentText>
                    <MediaCard card={this.state.card} /></Grid>
                <Grid item  className={styles.opponentUserResult}>
                    <DialogTitle id="simple-dialog-title" className={styles.center}>{data.opponent.username}</DialogTitle>
                    <DialogContentText className={styles.center}> {data.result.attribute} : {data.opponent.attribute}</DialogContentText>
                    <MediaCard card={this.state.card}/></Grid>
                </Grid>
            </Dialog>
        );
    }

    turno() {
        if (this.props.data.turno === this.props.mainUser) {
            return (<h3 className={styles.center}>Es tu turno</h3>);
        } else {
            return (<h3 className={styles.center}>Esperando oponente</h3>);
        }
    }


    render() {
        return (

        <div title="Game" className={styles.root}>
            {this.turno()}
            <Grid title="Board" container direction="column" justify="flex-start" alignItems="stretch" spacing={3} xs={12}>
                {/**/ }
                <Grid title="Opponent" container spacing={1} direction="row" style={{padding:16}} item>
                    <Grid item xs={2} className={styles.users}>
                        <Avatar alt="Remy Sharp" src={this.state.userOpponent.imageUrl} title={"Username"}/>
                        {this.state.userOpponent.userName}
                    </Grid>
                    <FormRow score={this.state.userOpponent.score} cardsLeft={this.state.deckCount}/>
                </Grid>

                <Grid title="MainUser" container  spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className={styles.users}>
                        <Avatar alt="Remy Sharp" src={this.state.userMain.imageUrl} title={"Username"}/>
                        {this.state.userMain.userName}
                    </Grid>
                    <FormRow score={this.state.userMain.score} cardsLeft={this.state.deckCount}/>
                </Grid>
            </Grid>


            <Grid title="Configuration" container alignItems={"flex-end"}>
                <Grid container item xs={12} justify={"flex-end"}>
                    {this.chooseAttributeButton()}
                    <Button variant="contained" >Abandonar</Button>
                </Grid>
            </Grid>

            <SimpleResultDialog data={{"result":{"event":"Winner","user":"username1","attribute":"Fuerza"},
                                    "mainUser": {"username":"username1", "attribute": "5"},
                                    "opponent":{"username":"username2", "attribute": "10"}}} 
                open={this.state.openResult} onClose={this.handleCloseResult} card={this.state.card} />
            <MatchResultDialog open={this.state.openMatchResult} onClose={this.handleCloseMatchResult} result_status="lose"/>
        </div>
        );
    }

}
export default withSnackbar(Game);
