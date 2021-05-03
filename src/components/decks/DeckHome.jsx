import React from "react";
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemText, Paper} from "@material-ui/core";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";

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

    getDecks = async () => {
        let response = await this.deckClient.getDecks()
        return response.data
    }

    render() {
        return (
            <div style={{display: "flex", placeContent: "center"}}>
                <Paper className="container">
                    <List component="nav" aria-label="main mailbox folders">
                        {this.state.decks.map((s, i) => (
                            <React.Fragment>
                                <ListItem button key={i}>
                                    <ListItemText primary={s.name}/>
                                </ListItem>
                                <Divider/>
                            </React.Fragment>
                        ))
                        }
                    </List>
                </Paper>
            </div>
        )
    }
}

export default DeckHome