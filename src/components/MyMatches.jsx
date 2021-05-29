import React, {Component} from 'react';
import Header from "./Header";
import List from "@material-ui/core/List";
import {Divider, ListItem, ListItemText, Modal, Paper} from "@material-ui/core";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
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
            matchInfo: {movements:[]}
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
                console.log(response)
                this.setState({open: true, matchInfo: response});
            }
        )
    };

    handleClose = () => {
        this.setState({ open: false });
    };


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

                    <div style={{
                        alignContent: 'center',
                        width: 400,
                        backgroundColor: "lightgray",
                        border: '2px solid #000',
                        padding: '2%'
                    }}>
                        <h2 id="simple-modal-title">Enfrentamientos de la partida</h2>
                        <p id="simple-modal-description">
                            {this.state.matchInfo.movements.map((m,i) =>(
                                <span key={i}>
                                    {m.attribute_name}
                                </span>
                            ))}
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </p>
                    </div>
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

export default MyMatches;