import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import '../../styles/Game.css';
import defaultCardJpg from "../../resources/images/cardback.jpg";
import MediaCard from "../cards/HeroCard";

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
        console.log(this.props.cardReceived)
        return (
            <React.Fragment>
                <Grid container direction="row" justify="space-around"  item xs={8}>
                    <Grid title={"DeckWin"} item xs={3} style={this.classes.roots} >
                        <Card style={this.classes.roots}>
                            <CardActionArea>
                                <CardMedia
                                    style={this.classes.media}
                                    image={defaultCardJpg}
                                />
                            </CardActionArea>
                        </Card>
                        Puntaje: {this.props.score}
                    </Grid>
                    <Grid title={"CardUse"} item xs={3} style={this.classes.roots} >
                        <Card style={this.classes.roots}>
                            <CardActionArea>
                                {this.props.cardReceived ?
                                    <MediaCard card={this.props.cardReceived}/>
                                    :
                                    <CardMedia style={this.classes.media} image={defaultCardJpg}/>
                                }
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid title={"Deck"} item xs={3} style={this.classes.roots} >
                        <Card style={this.classes.roots}>
                            <CardActionArea>
                                <CardMedia
                                    style={this.classes.media}
                                    image={defaultCardJpg}
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
