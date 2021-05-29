import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {ButtonGroup} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {ReactComponent as HeightIcon} from "../../resources/images/height.svg";
import {ReactComponent as WeightIcon} from "../../resources/images/weight.svg";
import {ReactComponent as StrongIcon} from "../../resources/images/strong.svg";
import {ReactComponent as BrainIcon} from "../../resources/images/brain.svg";
import {ReactComponent as SpeedIcon} from "../../resources/images/speed.svg";
import {ReactComponent as PowerIcon} from "../../resources/images/power.svg";
import {ReactComponent as CombatIcon} from "../../resources/images/combat.svg";
import MediaCard from "../cards/HeroCard";
import {red} from "@material-ui/core/colors";

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
    dialog: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        height:500,
        width: 300,
    },
    icon:{
        height:"50%",
        width: '50%',
        maxHeight:65,
        background:"#CACFD2"
    },
    botones:{
        maheight:500,
        width: 30,
        justify: "strech",
        justifyItems: "stretch"
    },
    prueba: {
        maxWidth:25,
        maxHeight:450
    },

    focus:{
        background:"#229954"
    },
    image:{
        height:"50%",
        width: '50%',
        maxHeight:65
    },
}));

export default function Game(props) {
    const classes = useStyles();
    var userMain = props.data.usuarios.find((user)=>user.username=props.mainUser);
    var userOpponent = props.data.usuarios.find((user)=>user.username!== props.mainUser);
    const card = userMain.cartaActual;
    const [openCard, setOpenCard] = React.useState(false);
    const [attribute, setAttribute] = React.useState("");
    const handleClickOpenCard = () => {
        setOpenCard(true);
    };

    const handleClose = (value) => {
        setAttribute(value);
        setOpenCard(false);
        //setear atributo y llamar al back
    };
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
    function setAttrubute(){
        if (props.mainUser === props.data.turno){
            return (
                <React.Fragment>
                    <Button variant="contained" onClick={handleClickOpenCard}>Seleccionar atributo</Button>
                    <SimpleDialog selectedValue={attribute} open={openCard} onClose={handleClose} />
                </React.Fragment>);
        }
    }
    function SimpleDialog(props) {
        const classes = useStyles();
        const { onClose, selectedValue, open } = props;
        const [attribute, setAttribute] = React.useState("");
        const handleClose = () => {
            onClose(attribute);
        };
        const handleCancel = () =>{
            onClose("");
        };
        const handleListAttributeClick = (value) => {
            setAttribute(value);
        };
        function estilo(attr){
            if (attribute===attr){
                return `${classes.image} ${classes.focus}`
            }
            else{
                return `${classes.image}`
            }
        }
        return (
            <Dialog onClose={handleCancel} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Elegir un atributo</DialogTitle>
                <Grid container className={classes.dialog} xs={12}>
                    <ButtonGroup title="botones" variant="outlined" color="secondary" size="small" aria-label="outlined secondary button group" orientation="vertical" className={classes.prueba}>
                        <IconButton aria-label="Altura" size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Altura")}>
                            <HeightIcon className={estilo("Altura")}/>
                        </IconButton>
                        <IconButton aria-label="Peso"   size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Peso")}>
                            <WeightIcon className={estilo("Peso")}/>
                        </IconButton>
                        <IconButton aria-label="Fuerza" size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Fuerza")}>
                            <StrongIcon className={estilo("Fuerza")}/>
                        </IconButton>
                        <IconButton aria-label="Inteligencia" size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Inteligencia")}>
                            <BrainIcon className={estilo("Inteligencia")}/>
                        </IconButton>
                        <IconButton aria-label="Velocidad"  size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Velocidad")}>
                            <SpeedIcon className={estilo("Velocidad")}/>
                        </IconButton>
                        <IconButton aria-label="Poder" size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Poder")}>
                            <PowerIcon className={estilo("Poder")}/>
                        </IconButton>
                        <IconButton  aria-label="Combate" size={"small"} className={classes.icon} onClick={() =>handleListAttributeClick("Combate")}>
                            <CombatIcon className={estilo("Combate")}/>
                        </IconButton>
                    </ButtonGroup>
                    <Grid item >
                        <MediaCard
                            data={card}
                        /></Grid>
                </Grid>
                <Button variant="contained" onClick={handleClose}>Jugar</Button>
            </Dialog>
        );
    }
    return (
        <div title="Game" className={classes.root}>
            <Grid title="Board" container direction="column" justify="flex-start" alignItems="stretch" spacing={5} xs={12}>
                <Grid title="Opponent" container spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className={classes.users}>
                        <Avatar alt="Remy Sharp" src={userOpponent.image} title={"Username"}/>
                        {userOpponent.username}
                    </Grid>
                    <FormRow score={userOpponent.ganadas} cards={userOpponent.carta}/>
                </Grid>
                <Grid title="MainUser" container  spacing={1} direction="row" className={"padding:10"} item>
                    <Grid item xs={2} className={classes.users}>
                        <Avatar alt="Remy Sharp" src={userMain.image} title={"Username"}/>
                        {userMain.username}
                    </Grid>
                    <FormRow score={userMain.ganadas} cards={userMain.carta}/>
                </Grid>
            </Grid>
            <Grid title="Configuration" container alignItems={"flex-end"}>
                <Grid container item xs={"12"} justify={"flex-end"}>
                    {setAttrubute()}
                    <Button variant="contained" >Abandonar</Button>
                </Grid>
            </Grid>
        </div>
    );
}
