import React from "react";
import List from '@material-ui/core/List';
import {Divider, ListItem, ListItemText, Paper} from "@material-ui/core";

class DeckHome extends React.Component {
    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
    }



    render() {
        return (
            <div style={{display: "flex", placeContent: "center"}}>
                <Paper className="container">
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                            <ListItemText primary="Inbox"/>
                        </ListItem>
                        <Divider/>
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