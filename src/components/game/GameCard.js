import React from 'react';
import Button from "@material-ui/core/Button";
import {Box, ButtonGroup, Icon} from "@material-ui/core";
import MediaCard from "../cards/HeroCard.js"
import IconButton from "@material-ui/core/IconButton";
import ReactCardFlip from 'react-card-flip';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as BrainIcon } from '../../resources/images/brain.svg';
import { ReactComponent as HeightIcon } from '../../resources/images/height.svg';
import { ReactComponent as WeightIcon } from '../../resources/images/weight.svg';
import { ReactComponent as StrongIcon } from '../../resources/images/strong.svg';
import { ReactComponent as SpeedIcon } from '../../resources/images/speed.svg';
import { ReactComponent as PowerIcon } from '../../resources/images/power.svg';
import { ReactComponent as CombatIcon } from '../../resources/images/combat.svg';
import Grid from '@material-ui/core/Grid';
import {red} from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
    dialog: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
        height:450,
        width: 300,
    },
    icon:{
        height:"50%",
        width: '50%',
        color: red[500],
        background: "green",
        maxHeight:65
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
    }
}));
export default function GameCard(props){
    const classes = useStyles();

    return(
        <Grid container className={classes.dialog} xs={12}>
                <ButtonGroup title="botones" variant="outlined" color="secondary" size="small" aria-label="outlined secondary button group" orientation="vertical" className={classes.prueba}>
                    <IconButton aria-label="Altura" size={"small"} className={classes.icon}>
                        <HeightIcon/>
                    </IconButton>
                    <IconButton aria-label="Peso"   size={"small"} className={classes.icon}>
                        <WeightIcon />
                    </IconButton>
                    <IconButton aria-label="add an alarm" size={"small"} className={classes.icon}>
                        <StrongIcon/>
                    </IconButton>
                    <IconButton aria-label="add to shopping cart" size={"small"} className={classes.icon}>
                        <BrainIcon/>
                    </IconButton>
                    <IconButton aria-label="Velocidad"  size={"small"} className={classes.icon}>
                        <SpeedIcon/>
                    </IconButton>
                    <IconButton aria-label="add an alarm" size={"small"} className={classes.icon}>
                        <PowerIcon/>
                    </IconButton>
                    <IconButton  aria-label="add to shopping cart" size={"small"} className={classes.icon}>
                        <CombatIcon/>
                    </IconButton>
                </ButtonGroup>
            <Grid item >
                <MediaCard
                data={props.card}
            /></Grid>
        </Grid>);

}


