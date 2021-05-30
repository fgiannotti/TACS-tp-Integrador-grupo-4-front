import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import '../../styles/Game.css';
import CardJpg from "../../resources/images/cardback.jpg";


export default class FormRow extends React.Component {
    classes = {
        root: {
            padding:10,
            content:"center",
            justifyContent: "center",
            justifySelf: "canter"
        },
        roots: {
            maxWidth: 200,
            justifySelf: "center",
            textAlign: "center",
            padding: 2
        },
        media: {
            height: 150,
            paddingTop: "56.25%",
            textAlign: "center",
            justifySelf: "center",
        }
    }
    render() {
        return (
            <React.Fragment>
                <Grid container direction="row" justify="space-around"  item xs={8}>
                    <Grid title={"DeckWin"} item xs={3} style={this.classes.roots} >
                        <Card style={this.classes.roots}>
                            <CardActionArea>
                                <CardMedia
                                    style={this.classes.media}
                                    image={CardJpg}
                                />
                            </CardActionArea>
                        </Card>
                        Puntaje: {this.props.score}
                    </Grid>
                    <Grid title={"CardUse"} item xs={3} style={this.classes.roots} >
                        <Card style={this.classes.roots}>
                            <CardActionArea>
                                <CardMedia
                                    style={this.classes.media}
                                    image={CardJpg}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid title={"Deck"} item xs={3} style={this.classes.roots} >
                        <Card style={this.classes.roots}>
                            <CardActionArea>
                                <CardMedia
                                    style={this.classes.media}
                                    image={CardJpg}
                                />
                            </CardActionArea>
                        </Card>
                        Cartas restantes: {this.props.cardsLeft}
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
