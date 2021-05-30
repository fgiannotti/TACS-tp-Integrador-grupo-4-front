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
import MatchResultDialog from "./MatchResulDialog"
import SimpleCardDialog from "./SimpleCardDialog"

class Game extends React.Component {
    constructor(props) {
        super(props);
        let userMain = this.props.data.usuarios.find((user)=>user.userName === this.props.mainUser);
        let userOpponent = this.props.data.usuarios.find((user)=>user.userName !== this.props.mainUser);

        const card = userMain.cartaActual;

        this.state = {
            card: card,
            openCard: false,
            openMatchResult: false,
            openResult: false,
            attribute: "",
            opponent: userOpponent,
            creator: userMain,
            deckCount: 0,
        }
        console.log(this.state)
    }



    componentDidMount() {
    ManagementSocket.subscribeObserver(this)
        ManagementSocket.sendMessage("CONNECT GAME")
    }

    receiveMessage = (message) => {
        console.log(message)
        if(message.data.includes("INIT")){
            let messageJson = JSON.parse(message.data)
            let userMain = messageJson.creator
            let userOpponent = messageJson.opponent
            let deckCount = messageJson.deckCount
            this.setState({creator: userMain, opponent: userOpponent, deckCount: deckCount})
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
                <Grid title="Opponent" container spacing={1} direction="row" style={{padding:16}} item>
                    <Grid item xs={2} className={styles.users}>
                        <Avatar alt="Remy Sharp" src={this.state.opponent.imageUrl} title={"Username"}/>
                        {this.state.opponent.userName}
                    </Grid>
                    <FormRow score={this.state.opponent.score} cardsLeft={this.state.deckCount}/>
                </Grid>

                <Grid title="MainUser" container  spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className={styles.users}>
                        <Avatar alt="Remy Sharp" src={this.state.creator.imageUrl} title={"Username"}/>
                        {this.state.creator.userName}
                    </Grid>
                    <FormRow score={this.state.creator.score} cardsLeft={this.state.deckCount}/>
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
