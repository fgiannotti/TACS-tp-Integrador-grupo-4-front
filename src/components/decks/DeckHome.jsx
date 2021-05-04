import React from "react";
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemText, Paper, TextField} from "@material-ui/core";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import Header from '../home/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import '../../styles/DeckHome.css'

class DeckHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: []
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.getDecks().then((decksResponse) => {
            this.setState({decks: decksResponse})
        })
    }

    deckClient = new SuperfriendsBackendClient()

    getDecks = () => {
        return this.deckClient.getDecks()
    }

    onClickView = (deck) => {
        console.log(deck);
        //todo: saltar a la vista del builder con este deck como prop
        window.location.href = "/deck-builder?deckName="+deck.name+"&isSaved=true&cardIds="+deck.card_ids.join(",");
    }

    onClickAdd = () => {
        console.log();
        window.location.href = "/deck-builder"
    }

    onClickDelete = async (deckId) => {
        await this.deckClient.deleteDeck(deckId).then(r => console.log(r))
        this.getDecks().then((decksResponse) => {
            this.setState({decks: decksResponse})
        })
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="deck-home">
                    <div className="search-deck-bar">
                        <Autocomplete
                            freeSolo
                            style={{minWidth: '50%'}}
                            id="free-solo-2-demo"
                            disableClearable
                            options={this.state.decks.map((deck) => deck.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Busca un mazo"
                                    margin="normal"
                                    variant="outlined"
                                    InputProps={{...params.InputProps, type: 'search'}}
                                />)}
                        />
                        {this.props.isAdmin ?
                            <IconButton edge="end" aria-label="add" onClick={() => this.onClickAdd()}>
                                <AddIcon/>
                            </IconButton>
                            : <React.Fragment/>}
                    </div>
                    <div>
                        <Paper className="container">
                            <List component="nav" aria-label="main mailbox folders">
                                {this.state.decks.map((deck, i) => (
                                    <React.Fragment key={i}>
                                        <ListItem button dense key={deck.id} onClick={() => this.onClickView(deck)}>
                                            <ListItemText primary={deck.name}/>
                                            <ListItemText style={{textAlign: 'end'}}
                                                          primary={deck.card_ids.length + '/' + deck.card_ids.length}/>
                                            {this.props.isAdmin ?
                                                <ListItemSecondaryAction>
                                                <IconButton onClick={() => this.onClickDelete(deck.id)} edge="end"
                                                            aria-label="delete">
                                                    <DeleteOutlineIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                                : <React.Fragment />}
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                ))
                                }
                            </List>
                        </Paper>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default DeckHome