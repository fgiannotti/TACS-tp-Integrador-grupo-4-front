import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {Grid, TextField, Fab } from '@material-ui/core';
import '../../styles/CommonLayoutsFlex.css';
import '../../styles/CommonStyles.css';
import '../../styles/OverridedMui.css';


class DeckNameAndSave extends React.Component {
    classes = {
        notchedOutline: {
            borderColor: '#ffcc80'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            error: true,
            helperText: 'Debe ingresar el nombre del mazo',
            updated: false
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log(prevState)
        let firstUpdate = !prevState.updated


        const deckNameExists = this.props.deckName ? true:false;
        if (deckNameExists && firstUpdate) {
            console.log("deck name exists")
            this.setState({
                error: false,
                helperText: '',
                updated: true
            })
        }
    }

    handleDeckNameChange = (event) => {
        const deckName = event.target.value;
        if (deckName.length) {
            console.log("deck name exists2")
            this.setState({
                error: false,
                helperText: ''
            })
            this.props.changeDeckNameIsValid(true);
            this.props.changeDeckName(deckName);
        } else {
            console.log("deck name exists not")

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
                    <Grid style={{paddingTop:'16px'}} item>
                        <EditIcon color='primary'/>
                    </Grid>
                    <Grid item>
                        <TextField
                            className='whitesmoke-color'
                            helperText={this.state.helperText} 
                            error={this.state.error} 
                            label='Nombre del mazo' 
                            size='small' 
                            color='#ffcc80'
                            value={this.props.deckName ?? ''}
                            variant='filled' 
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
