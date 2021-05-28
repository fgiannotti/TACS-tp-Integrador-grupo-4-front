import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
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
    },
    users: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        alignItems: "center",
        justifyContent: "center",
        justifySelf:"center",
        content:"center",
    },
    deck: {
        padding:10,
        content:"center",
        justifyContent: "center",
        justifySelf: "canter"
    },
}));

export default function Game() {
    const classes = useStyles();

    function FormRow(props) {
        return (
            <React.Fragment>
                <Grid container direction="row" justify="space-around"  item xs={8}>
                <Grid title={"DeckWin"} item xs={3} className={classes.roots} >
                    <Card className={classes.roots}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                    Puntaje: {props.score}
                </Grid>
                <Grid title={"CardUse"} item xs={3} className={classes.roots} >
                    <Card className={classes.roots}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid title={"Deck"} item xs={3} className={classes.roots} >
                    <Card className={classes.roots}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={"https://retrocromy.com.ar/wp-content/uploads/2020/06/SuperAmigos40.jpg"}
                            />
                        </CardActionArea>
                    </Card>
                    Cartas restantes: {props.cards}
                </Grid>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div title="Game" className={classes.root}>
            <Grid title="Board" container direction="column" justify="flex-start" alignItems="stretch" spacing={5} xs={12}>
                <Grid title="Opponent" container spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className={classes.users}>
                        <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png" title={"Username"}/>
                        Usernameadsfasdf
                    </Grid>
                    <FormRow score={5} cards={12}/>
                </Grid>
                <Grid title="MainUser" container  spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className={classes.users}>
                        <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png" title={"Username"}/>
                        Usernameadsfasdf
                    </Grid>
                    <FormRow score={10} cards={12}/>
                </Grid>
            </Grid>
            <Grid title="Configuration" container alignItems={"flex-end"}>
                <Grid container item xs={"12"}  justify={"flex-end"}>
                    <Button variant="contained" >Abandonar</Button>
                </Grid>
            </Grid>
        </div>
    );
}
