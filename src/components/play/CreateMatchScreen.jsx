import React from 'react';
import {Paper, TextField} from "@material-ui/core";
import '../../styles/CommonStyles.css';
import '../../styles/CommonLayoutsFlex.css';
import Button from "@material-ui/core/Button";
import {Autocomplete} from "@material-ui/lab";

class CreateMatchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDeck: ''
        }
    }

    sendToLobby() {
        window.location.href = "/lobby?deckName=" + this.state.chosenDeck
    }

    render() {
        return (
            <div className="flex-column-center" style={{margin: '4%'}}>
                <Paper className="container align-items-center flex-column-space-around p1"
                       style={{minWidth: '25%', minHeight: '40%', backgroundColor: '#B3C0A4', borderRadius: '10%'}}>
                        <span className="m1" style={{fontSize: "x-large", fontWeight: "bold"}}>
                            Elegi un mazo y crea una nueva sala
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
                    <Button disabled={!this.state.chosenDeck} className="m2" variant="contained" color="primary"
                            style={{fontWeight: 'bold'}}
                            onClick={() => this.sendToLobby()}> Crear sala </Button>
                </Paper>
            </div>
        );
    }

}

export default CreateMatchScreen;