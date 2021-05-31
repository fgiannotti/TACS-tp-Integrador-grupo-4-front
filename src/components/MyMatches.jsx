import React, {Component} from 'react';
import Header from "./Header";
import List from "@material-ui/core/List";
import { withCookies } from "react-cookie";
import {Divider, ListItem, ListItemText, Modal, Paper} from "@material-ui/core";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SuperfriendsBackendClient from "../SuperfriendsBackendClient";
import Loader from "./utils/Loader";
import Button from "@material-ui/core/Button";

class MyMatches extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matches: [],
            isLoading: true,
            open: false,
            matchInfo: {movements: []}
        }
    }
    backendClient = new SuperfriendsBackendClient()

    componentDidMount() {
        this.backendClient.getMatchesOfUser(this.props.loggedUser)
            .then((response) => this.setState({
                matches: response,
                isLoading: false
            }))
    }

    handleOpen = (matchId) => {
        this.backendClient.getMatchById(matchId).then(response => {
                let isUserMatchCreator = response.match_creator.user_id === this.props.cookies.get('GOOGLEID')
                this.setState({open: true, matchInfo: response, isUserMatchCreator: isUserMatchCreator});
            }
        )
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getCardName(cardId) {
        return this.state.matchInfo.deck.cards.find(c => c.id === cardId).name
    }

    render() {

        return (
            <React.Fragment>
                <Header />
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="flex-column-center">
                <Paper className="container" style={{minWidth: '50%'}}>
                    <List component="nav" aria-label="main mailbox folders">
                            <ListItem style={{textAlign: 'center', backgroundColor: 'lightgray'}} dense key={"header"} onClick={() => {}}>
                                {["Mov.","Tu carta", "Carta del Oponente", "Atributo elegido"].map((label, i) => (
                                    <ListItemText key={i} style={{width: '25%'}} primary={label}/>
                                ))}
                            </ListItem>
                            <Divider/>
                            
                            {this.state.matchInfo.movements.sort((a,b) => a.id - b.id).map((movement, i) => (
                                <React.Fragment key={i}>
                                    <ListItem style={{textAlign: 'center'}} dense key={movement.id}>
                                        <ListItemText style={{width: '25%'}} primary={i++}/>

                                        <div style={{width: '25%',display:'flex', alignItems: 'center'}}>
                                            <ListItemText primary={this.state.isUserMatchCreator ? this.getCardName(movement.creator_card_id) : this.getCardName(movement.opponent_card_id)} />
                                            {movement.winner_id_or_tie === this.props.loggedUser ? <CheckCircleIcon style={{fontSize: 'small'}} /> : <React.Fragment />}
                                        </div>

                                        <div style={{width: '25%',display:'flex', alignItems: 'center'}}>
                                            <ListItemText  primary={this.state.isUserMatchCreator ? this.getCardName(movement.opponent_card_id) : this.getCardName(movement.creator_card_id)} />
                                            {movement.winner_id_or_tie !== 'TIE' && movement.winner_id_or_tie !== this.props.loggedUser ? <CheckCircleIcon style={{fontSize: 'small'}} /> : <React.Fragment /> }
                                        </div>

                                        <ListItemText style={{width: '25%'}} primary={movement.attribute_name === "STRENGTH" ? "Fuerza" 
                                            : (movement.attribute_name === "INTELLIGENCE") ? "Inteligencia"
                                            : (movement.attribute_name === "HEIGHT") ? "Altura"
                                            : (movement.attribute_name === "WEIGHT") ? "Peso"
                                            : (movement.attribute_name === "SPEED")  ? "Velocidad"
                                            : (movement.attribute_name === "POWER")  ? "Poder"
                                            : (movement.attribute_name === "COMBAT")  ? "Combate" : ""
                                        }/>
                                    </ListItem>
                                    {i !== (this.state.matchInfo.movements.length ) ? <Divider/> : <React.Fragment/>}
                                </React.Fragment>
                            ))
                            }
                        </List>

                        </Paper>
                </Modal>

                <div className="deck-home m2">
                    {this.state.isLoading ?
                        <div style={{align: 'center'}}>
                            <Loader/>
                        </div> :
                    <Paper className="container" style={{minWidth: '50%'}}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem style={{textAlign: 'center', backgroundColor: 'lightgray'}} dense key={"header"} onClick={() => {}}>
                                {["CREADOR", "VERSUS", "MAZO", "ESTADO"].map((label, i) => (
                                    <ListItemText key={i} style={{width: '25%'}} primary={label}/>
                                ))}
                            </ListItem>
                            <Divider/>
                            {this.state.matches.sort((a,b) => b.id - a.id).map((match, i) => (
                                <React.Fragment key={i}>
                                    <ListItem style={{textAlign: 'center'}}  button dense key={match.id} onClick={() => this.handleOpen(match.id)}>
                                        <ListItemText style={{width: '25%'}} primary={match.match_creator.user_name} />
                                        {match.winner_id ? (match.winner_id === match.match_creator.user_id) ? <EmojiEventsIcon /> : null : null}
                                        <ListItemText style={{width: '25%'}} primary={match.challenged_player.user_name} />
                                        {match.winner_id ? (match.winner_id === match.challenged_player.user_id) ? <EmojiEventsIcon /> : null : null}
                                        <ListItemText style={{width: '25%'}} primary={match.deck_db_dto.name}/>
                                        <ListItemText style={{width: '25%'}} >
                                            {match.status === "PAUSED" ?
                                            <Button variant="contained" color={"secondary"}>Continuar</Button>
                                            : (match.status === "FINISHED") ? "TERMINADO"
                                            : (match.status === "CREATED") ? "CREADO"
                                            : (match.status === "CANCELED") ? "CANCELADO"
                                            : "JUGANDO"}
                                        </ListItemText>
                                    </ListItem>
                                    {i !== (this.state.matches.length - 1) ? <Divider/> : <React.Fragment/>}
                                </React.Fragment>
                            ))
                            }
                        </List>
                    </Paper>
                }
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(MyMatches);