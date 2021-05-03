import React from "react";
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemText, Paper} from "@material-ui/core";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";

class DeckHome extends React.Component {
    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
    }

    deckClient = new SuperfriendsBackendClient()

    getDecks = () => {
       return this.deckClient.getDecks()
    }

    render() {
        return (
            <div style={{display: "flex", placeContent: "center"}}>
                <Paper className="container">
                    <List component="nav" aria-label="main mailbox folders">
                        {this.getDecks().map(s =>
                            <ListItem button>
                            <ListItemText primary={s.name}/>
                            </ListItem>,
                            <Divider/>
                            )
                        }
                        <ListItem button>
                            <ListItemText primary="Drafts"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Trash"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button component="a" href="#simple-list">
                            <ListItemText primary="Spam"/>
                        </ListItem>
                    </List>
                </Paper>
            </div>
        )
    }
}

export default DeckHome