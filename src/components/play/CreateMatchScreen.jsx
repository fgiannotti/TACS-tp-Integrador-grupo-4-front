import React from 'react';
import {Divider, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField} from "@material-ui/core";
import '../../styles/CommonStyles.css';
import '../../styles/CommonLayoutsFlex.css';
import Button from "@material-ui/core/Button";
import {Autocomplete} from "@material-ui/lab";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import {Redirect} from "react-router";
import { withCookies } from "react-cookie";

class CreateMatchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDeck: '',
            chosenOpponent: '',
            redirectToLobby: false
        }
    }

    createMatchClient = new SuperfriendsBackendClient()

    setOpponent = (opponent) => {
        this.setState({chosenOpponent: opponent.target.id})
    }

    async createAndSendToLobby() {

        const matchCreationDTO = {
            deck_id: this.props.decks.find((d) => d.name === (this.state.chosenDeck)).id,
            match_creator_id: this.props.userId,
            challenged_player_id: this.state.chosenOpponent
        }

        this.createMatchClient.createMatch(matchCreationDTO)
        .then((matchResponse) => {
            if (matchResponse) {
                console.log("matchResponse");
                console.log(matchResponse);
                this.setState({matchId: matchResponse, redirectToLobby: true})
            } else {
                console.log("An error occurred in post")
            }
        })
    }

    render() {
        if (this.state.redirectToLobby) return (<Redirect to={"/lobby?matchId=" + this.state.matchId}/>)
           return (
            <div className="flex-column-center" style={{margin: '4%'}}>
                        <Paper className="container align-items-center flex-column-space-around p1"
                               style={{
                                   minWidth: '25%',
                                   minHeight: '40%',
                                   backgroundColor: '#B3C0A4',
                                   borderRadius: '10%'
                               }}>
                        <span className="m1" style={{fontSize: "x-large", fontWeight: "bold"}}>
                            Elegi un mazo y desafia a otro usuario
                        </span>
                            <Autocomplete
                                className="m1"
                                id="free-solo-demo"
                                freeSolo
                                style={{minWidth: '60%'}}
                                options={this.props.decks.map((option) => option.name)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Busca un mazo" margin="normal" variant="outlined"/>
                                )}
                                onInputChange={(deckEvent) => this.setState({chosenDeck: deckEvent.target.innerText})}
                            />

                            <Paper style={{minWidth: '70%', backgroundColor: "lightgray"}}>
                                <FormControl fullWidth={true} component="fieldset">
                                    <RadioGroup>
                                        {this.props.connectedUsers.map((user, i) =>
                                            <React.Fragment key={i}>
                                                <FormControlLabel key={i}
                                                                  id={user.user_id}
                                                                  value={user.user_name}
                                                                  control={<Radio color="primary" id={user.user_id}/>}
                                                                  label={user.user_name}
                                                                  labelPlacement="start"
                                                                  disabled={user.user_id === this.props.cookies.get('GOOGLEID')}
                                                                  style={{
                                                                      display: 'flex',
                                                                      justifyContent: 'space-between',
                                                                      padding: '3%'
                                                                  }}
                                                                  onChange={this.setOpponent}
                                                />
                                                {i !== (this.props.connectedUsers.length - 1) ? <Divider/> :
                                                    <React.Fragment/>}
                                            </React.Fragment>
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </Paper>

                            <Button disabled={!this.state.chosenOpponent || !this.state.chosenDeck} variant="contained"
                                    color="primary"
                                    style={{margin: '16px', fontWeight: 'bold'}}
                                    onClick={() => this.createAndSendToLobby()}> JUGAR </Button>
                        </Paper>
                    </div>
           )
    }

}

export default withCookies(CreateMatchScreen);