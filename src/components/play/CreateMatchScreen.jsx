import React from 'react';
import {Divider, FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextField} from "@material-ui/core";
import '../../styles/CommonStyles.css';
import '../../styles/CommonLayoutsFlex.css';
import Button from "@material-ui/core/Button";
import {Autocomplete} from "@material-ui/lab";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";

class CreateMatchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDeck: '',
            chosenOpponent: ''
        }
    }

    createMatchClient = new SuperfriendsBackendClient()

    setOpponent = (opponent) => {
        this.setState({chosenOpponent: opponent.target.defaultValue})
    }

    async sendToLobby() {

        const matchCreationDTO = {
            deck_id: this.props.decks.find((d) => d.name === (this.state.chosenDeck)).id,
            match_creator_id: this.props.userId,
            challenged_player_id: this.state.chosenOpponent
        }
        console.log(matchCreationDTO)
        this.createMatchClient.createMatch(matchCreationDTO)
        .then((matchResponse) => {
            if (matchResponse) {
                window.location.href = "/lobby?matchId=" + matchResponse
            } else {
                console.log("An error occurred in post")
            }
        })
    }

    render() {
        return (
            <div className="flex-column-center" style={{margin: '4%'}}>
                <Paper className="container align-items-center flex-column-space-around p1"
                       style={{minWidth: '25%', minHeight: '40%', backgroundColor: '#B3C0A4', borderRadius: '10%'}}>
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
                        onInputChange={(deckEvent) => this.setState({chosenDeck: deckEvent.target.outerText})}
                    />

                    <Paper style={{minWidth: '70%', backgroundColor: "lightgray"}}>
                        <FormControl fullWidth={true} component="fieldset">
                            <RadioGroup>
                            {this.props.connectedUsers.map((user, i) =>
                                <React.Fragment key={i}>
                                    <FormControlLabel key={i}
                                                      value={user.user_name}
                                                      control={<Radio color="primary"/>}
                                                      label={user.user_name}
                                                      labelPlacement="start"
                                                      style={{
                                                          display: 'flex',
                                                          justifyContent: 'space-between',
                                                          padding: '3%'
                                                      }}
                                                      onChange={this.setOpponent}
                                    />
                                    {i !== (this.props.connectedUsers.length - 1) ? <Divider/> : <React.Fragment/>}
                                </React.Fragment>
                            )}
                            </RadioGroup>
                        </FormControl>
                    </Paper>

                    <Button disabled={!this.state.chosenDeck || !this.state.chosenOpponent} variant="contained" color="primary"
                            style={{margin:'16px',fontWeight: 'bold'}}
                            onClick={() => this.sendToLobby()}> JUGAR </Button>
                </Paper>
            </div>
        );
    }

}

export default CreateMatchScreen;