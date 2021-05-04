import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {Grid, TextField, Fab } from '@material-ui/core';
import '../../styles/CommonLayoutsFlex.css';
import '../../styles/CommonStyles.css';


class DeckNameAndSave extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: true,
            helperText: 'Debe ingresar el nombre del mazo'
        }
        this.handleDeckNameChange = this.handleDeckNameChange.bind(true);
    }

    handleDeckNameChange = (event) => {
        const deckName = event.target.value;
        if(deckName.length) {
            this.setState({
                error: false,
                helperText: ''
            })
            this.props.changeDeckNameIsValid(true);
            this.props.changeDeckName(deckName);
        } else {
            this.setState({
                error: true,
                helperText: 'Debe ingresar el nombre del mazo'
            })
            this.props.changeDeckNameIsValid(false);
            this.props.changeDeckName(deckName);
        }
    }

    render() {
        return (
            <div className='flex-row-center m1 p1'>
                <Grid container spacing={1}>
                    <Grid item>
                        <EditIcon color='primary'/>
                    </Grid>
                    <Grid item>
                        <TextField
                        helperText={this.state.helperText} 
                        error={this.state.error} 
                        label='Nombre del mazo' 
                        size='small' 
                        value={this.props.deckName}
                        variant='outlined' 
                        onChange={this.handleDeckNameChange}/>
                    </Grid>
                </Grid>
                <Fab variant="extended" color='primary' onClick={this.props.saveDeckAction}>
                    <SaveIcon />
                </Fab>
            </div>
        )
    }

}
export default DeckNameAndSave;
