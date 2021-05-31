import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {withSnackbar} from "./GameSnackBar";
import {Redirect} from "react-router"
import ManagementSocket from "../management_socket/ManagementSocket";
import styles from '../../styles/Game.css';
import SimpleResultDialog from "./SimpleResultDialog"
import FormRow from "./FormRow"
import {withCookies} from "react-cookie";
import MatchResultDialog from "./MatchResulDialog.jsx"
import SimpleCardDialog from "./SimpleCardDialog"
import Loader from "../utils/Loader";
import defaultCardJpg from "../../resources/images/cardback.jpg";

class Game extends React.Component {
    constructor(props) {
        super(props);
    //    let userMain = this.props.data.usuarios.find((user)=>user.userName === this.props.mainUser);
      //  let userOpponent = this.props.data.usuarios.find((user)=>user.userName !== this.props.mainUser);

        //const card = userMain.cartaActual;

        this.state = {
            openCard: false,
            openMatchResult: false,
            openResult: false,
            attribute: "",
            deckCount: 0,
            isLoading: true,
            loggedUser: this.props.cookies.get('GOOGLEID'),
            isMainUserTurn: false,
            mainUserCardUrl: defaultCardJpg,
            movementResult: {}
        }
    }



    componentDidMount() {
    ManagementSocket.subscribeObserver(this)
        ManagementSocket.sendMessage("CONNECT GAME")
    }

    receiveMessage = (message) => {
        console.log(message)
        if (message.data.includes("INIT")) {
            let messageJson = JSON.parse(message.data)
            let mainUser
            let opponent
            if (messageJson.creator.user_id === this.state.loggedUser) {
                mainUser = messageJson.creator
                opponent = messageJson.opponent
            } else {
                mainUser = messageJson.opponent
                opponent = messageJson.creator
            }
            let deckCount = messageJson.deck_count
            this.setState({mainUser: mainUser, opponent: opponent, deckCount: deckCount, isLoading: false})
        }
        if (message.data.includes("TURN")){
            console.log("received turn:");
            let messageJson = JSON.parse(message.data)
            console.log(messageJson);
            this.setState({cardReceived:messageJson.card, isMainUserTurn: messageJson.user_id_turn === this.state.loggedUser})
        }
        if (message.data.includes("MOVEMENT_RESULT")) {
            console.log("received movement result")
            let messageJson = JSON.parse(message.data)
            this.setState({openResult: true, movementResult: messageJson})
        }
    }

    handleClickOpenCard = () => {
        this.setState({openCard: true});
    };
    handleCloseResult = () =>{
        this.setState({openResult: false});
    }

    translateAttributeName = (value) => {
        switch (value.toUpperCase()) {
            case "PESO": return "WEIGHT"
            case "ALTURA": return "HEIGHT"
            case "VELOCIDAD": return "SPEED"
            case "COMBATE": return "COMBAT"
            case "INTELIGENCIA": return "INTELLIGENCE"
            case "PODER": return "POWER"
            case "FUERZA": return "STRENGTH"
        }
    }

    handleCloseCard = (value) => {
        this.setState({attribute: value, openCard: false});
        ManagementSocket.sendMessage("SET_ATTRIBUTE:" + this.translateAttributeName(value))
    };

    handleCloseMatchResult = () => {
        this.setState({openMatchResult: false});
        return <Redirect push to="/" />
    }


    render() {
        return (
            (this.state.isLoading ? <Loader /> :
        <div title="Game" className={styles.root}>
            <h3 className={styles.center}> {this.state.isMainUserTurn ? "Es tu turno" : "Esperando oponente"} </h3>
            <Grid title="Board" container direction="column" justify="flex-start" alignItems="stretch" spacing={3} xs={12} item={true}>
                <Grid title="Opponent" container spacing={1} direction="row" style={{padding:16}} item={true}>
                    <Grid item={true} xs={2} className={styles.users}>
                        <Avatar style={{height:'30%', width: '50%'}} alt="" src={this.state.opponent.image_url} title={"Username"}/>
                        <span>
                            {this.state.opponent.user_name}
                        </span>
                    </Grid>
                    <FormRow score={this.state.opponent.score} cardsLeft={this.state.deckCount}/>
                </Grid>

                <Grid title="MainUser" container  spacing={1} direction="row" className={"padding:10"} item={true}>
                    <Grid item={true} xs={2} className={styles.users}>
                        <Avatar style={{height:'30%', width: '50%'}} alt="" src={this.state.mainUser.image_url} title={"Username"}/>
                        {this.state.mainUser.user_name}
                    </Grid>
                    <FormRow score={this.state.mainUser.score} cardReceived={this.state.cardReceived} cardsLeft={this.state.deckCount}/>
                </Grid>
            </Grid>

            <Grid container alignItems={"flex-end"} item={true}>
                <Grid container xs={12} justify={"flex-end"} item={true}>
                    <React.Fragment>
                        <Button variant="contained" disabled={!this.state.isMainUserTurn} onClick={this.handleClickOpenCard}>Seleccionar atributo</Button>
                        <SimpleCardDialog card={this.state.cardReceived} selectedValue={this.state.attribute} open={this.state.openCard} onClose={this.handleCloseCard} />
                    </React.Fragment>
                    <Button variant="contained" >Abandonar</Button>
                </Grid>
            </Grid>

            {this.state.openResult ?
                <SimpleResultDialog cards={this.state.movementResult.cards}
                                    tie={this.state.movementResult.winner_id === "TIE"}
                                    open={this.state.openResult} onClose={this.handleCloseResult}
                                    winner={this.state.movementResult.winner_id === this.state.loggedUser ? this.state.mainUser.user_name : this.state.opponent.user_name}/>
                : <React.Fragment/>
            }

            <MatchResultDialog open={this.state.openMatchResult} onClose={this.handleCloseMatchResult} result_status="lose"/>
        </div>
        ));
    }

}
export default withCookies(withSnackbar(Game));
