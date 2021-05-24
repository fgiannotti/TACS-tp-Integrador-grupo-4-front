import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        title: "Board",
        padding: 10,
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
    },
}));

export default function Game() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid title={"DeckWin"} item xs={12} className={classes.roots} >
                    <Card className={classes.roots} >
                        <CardActionArea className={classes.roots}>
                            <CardMedia
                                className={classes.media}
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                    Cantidad de cartas ganadas X
                </Grid>
                <Grid title={"CardUse"} item xs={12} className={classes.roots} >
                    <Card className={classes.roots}  align={"center"}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid title={"Deck"} item xs={12} className={classes.roots} >
                    <Card className={classes.roots}  align={"center"}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                    Cantidad de cartas faltantes X
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div title="Game" className={classes.root}>
            <Grid title="Board" container spacing={10} className={classes.root}>
                <Grid title="Opponent" container item xs={"12"} spacing={10} className={classes.root}>
                    <FormRow />
                </Grid>
                <Grid title="MainUser" container item xs={"12"} spacing={10} className={classes.root}>
                    <FormRow />
                </Grid>
            </Grid>
            <Grid title="Configuration" container spacing={10} alignItems={"flex-end"}>
                <Grid title="Prueba" container item xs={"12"} spacing={10}  justify={"flex-end"}>
                    <Button variant="contained" >Abandonar</Button>
                </Grid>
            </Grid>
        </div>
    );
}
