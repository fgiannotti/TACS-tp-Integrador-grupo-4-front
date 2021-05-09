import React from "react";
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemText, Paper} from "@material-ui/core";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import Header from '../home/Header';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import '../../styles/DeckHome.css'
import SearchBar from "material-ui-search-bar";

class DeckHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: []
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.getDecksAndSetState()
    }

    deckClient = new SuperfriendsBackendClient()

    getDecksAndSetState = () => {
        return this.deckClient.getDecks().then((decksResponse) => {
            this.setState({decks: decksResponse})
        })
    }

    onClickView = (deck) => {
        console.log(deck);
        //todo: saltar a la vista del builder con este deck como prop
        window.location.href = "/deck-builder?deckId=" + deck.id + "&deckName=" + deck.name + "&isSaved=true&cardIds=" + deck.card_ids.join(",");
    }

    onClickAdd = () => {
        console.log();
        window.location.href = "/deck-builder"
    }

    onClickDelete = async (deckId) => {
        await this.deckClient.deleteDeck(deckId).then(r => console.log(r))
        await this.getDecksAndSetState()
    }

    async searchByDeckName(value) {
        if (value) {
            let filteredDecks = this.state.decks.filter((d) => d.name.toUpperCase().includes(value.toUpperCase()))
            !filteredDecks.isEmpty ?
                this.setState({decks: filteredDecks})
                :
                await this.getDecksAndSetState()
        } else {
            await this.getDecksAndSetState()
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="deck-home">
                    <div className="search-deck-bar">
                        <SearchBar placeholder={"Busca un mazo"} style={{minWidth: '50%'}}
                                   onChange={(value) => this.searchByDeckName(value)}/>
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
                                                : <React.Fragment/>}
                                        </ListItem>
                                        {i !== (this.state.decks.length -1) ? <Divider/> : <React.Fragment/>}
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