import React, {Component} from 'react';
import Header from "./Header";
import List from "@material-ui/core/List";
import {Divider, Icon, ListItem, ListItemText, Paper} from "@material-ui/core";
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SuperfriendsBackendClient from "../SuperfriendsBackendClient";
import Loader from "./utils/Loader";
import Button from "@material-ui/core/Button";

class MyMatches extends Component {
    constructor(props) {
        super(props)
        this.state = {
            matches: [],
            isLoading: true
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

    render() {
        return (
            <React.Fragment>
                <Header />
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
                                    <ListItem style={{textAlign: 'center'}}  button dense key={match.id} onClick={() => {}}>
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