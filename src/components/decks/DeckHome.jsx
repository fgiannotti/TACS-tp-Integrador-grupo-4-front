import React from "react";
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemText, Paper} from "@material-ui/core";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import Header from  '../home/Header';

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
            console.log(decksResponse)
        })
    }

    deckClient = new SuperfriendsBackendClient()

    getDecks = () => {
        return this.deckClient.getDecks()
    }

    onClick = (cosas)=> {
        console.log(cosas);
        //TODO: VER COMO TRAERSE LA INFO DEL COMP (deck) para pasarselo a la siguiente vista
    }

    render() {
        return (
            <React.Fragment>
            <Header/>
            <div style={{display: "flex", placeContent: "center", padding:'16px'}}>
                <Paper className="container">
                    <List component="nav" aria-label="main mailbox folders">
                        {this.state.decks.map((s, i) => (
                            <React.Fragment key={i}>
                                <ListItem button key={s.id} onClick={this.onClick}>
                                    <ListItemText primary={s.name}/>
                                    <ListItemText style={{textAlign:'end'}} primary={s.card_ids.length+'/'+s.card_ids.length}/>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        ))
                        }
                    </List>
                </Paper>
            </div>
            </React.Fragment>
            
        )
    }
}

export default DeckHome