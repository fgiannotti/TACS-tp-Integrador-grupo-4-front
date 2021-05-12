import React from 'react';
import {Paper, TextField} from "@material-ui/core";
import '../../styles/CommonStyles.css';
import '../../styles/CommonLayoutsFlex.css';
import Button from "@material-ui/core/Button";
import {Autocomplete} from "@material-ui/lab";

class CreateMatchScreen extends React.Component {

    searchDeck(name) {

    }

    render() {
        return (
            <React.Fragment>
                <div className="flex-column-center m1">
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
                                <TextField {...params} label="Busca un mazo" margin="normal" variant="outlined" />
                            )}
                        />
                        <Button className="m2" variant="contained" color="primary" style={{fontWeight: 'bold'}}
                                onClick={() => {
                                }}> Crear sala </Button>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateMatchScreen;