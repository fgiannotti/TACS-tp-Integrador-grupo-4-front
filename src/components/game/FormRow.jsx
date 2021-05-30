import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import './Game.css'
import cardBack from '../../resources/images/cardback.jpg'


export default class FormRow extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Grid container direction="row" justify="space-around"  item xs={8}>
                <Grid title={"DeckWin"} item xs={3} className="roots" >
                    <Card className="roots">
                        <CardActionArea>
                            <CardMedia
                                className="media"
                                image={cardBack}
                            />
                        </CardActionArea>
                    </Card>
                    Puntaje: {this.props.score}
                </Grid>
                <Grid title={"CardUse"} item xs={3} className="roots" >
                    <Card className="roots">
                        <CardActionArea>
                            <CardMedia
                                className="media"
                                image={cardBack}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid title={"Deck"} item xs={3} className="roots" >
                    <Card className="roots">
                        <CardActionArea>
                            <CardMedia
                                className="media"
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
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
