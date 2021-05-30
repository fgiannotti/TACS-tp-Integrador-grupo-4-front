import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import MediaCard from "../cards/HeroCard";
import Dialog from '@material-ui/core/Dialog';
import {ButtonGroup} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import {ReactComponent as HeightIcon} from "../../resources/images/height.svg";
import {ReactComponent as WeightIcon} from "../../resources/images/weight.svg";
import {ReactComponent as StrongIcon} from "../../resources/images/strong.svg";
import {ReactComponent as BrainIcon} from "../../resources/images/brain.svg";
import {ReactComponent as SpeedIcon} from "../../resources/images/speed.svg";
import {ReactComponent as PowerIcon} from "../../resources/images/power.svg";
import {ReactComponent as CombatIcon} from "../../resources/images/combat.svg";
import Grid from '@material-ui/core/Grid';
import './Game.css'

export default class SimpleCardDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            attribute: this.props.selectedValue,
        }
    }

    handleClose = () => {
        this.props.onClose(this.state.attribute);
    };

    handleCancel = () =>{
        this.props.onClose("");
    };

    handleListAttributeClick = (value) => {
        this.setState({attribute:value})
    };

    estilo = (attr) => {
        return this.state.attribute === attr ? "image focus" : "image"
    }

    playButton = (attr) => {
        if(attr !== "" ){
            return (<Button variant="contained" onClick={this.handleClose} color={"secondary"}>Jugar</Button>);
        }
    }

    render() {
        return (
            <Dialog onClose={this.props.handleCancel} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Elegir un atributo</DialogTitle>
                <Grid container className="dialog" xs={12}>
                    <ButtonGroup title="botones" variant="outlined" color="secondary" size="small"
                                 aria-label="outlined secondary button group" orientation="vertical"
                                 className="buttonGroup">
                        <IconButton aria-label="Altura" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Altura")}>
                            <HeightIcon className={this.estilo("Altura")}/>
                        </IconButton>
                        <IconButton aria-label="Peso" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Peso")}>
                            <WeightIcon className={this.estilo("Peso")}/>
                        </IconButton>
                        <IconButton aria-label="Fuerza" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Fuerza")}>
                            <StrongIcon className={this.estilo("Fuerza")}/>
                        </IconButton>
                        <IconButton aria-label="Inteligencia" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Inteligencia")}>
                            <BrainIcon className={this.estilo("Inteligencia")}/>
                        </IconButton>
                        <IconButton aria-label="Velocidad" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Velocidad")}>
                            <SpeedIcon className={this.estilo("Velocidad")}/>
                        </IconButton>
                        <IconButton aria-label="Poder" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Poder")}>
                            <PowerIcon className={this.estilo("Poder")}/>
                        </IconButton>
                        <IconButton aria-label="Combate" size={"small"} className="icon"
                                    onClick={() => this.handleListAttributeClick("Combate")}>
                            <CombatIcon className={this.estilo("Combate")}/>
                        </IconButton>
                    </ButtonGroup>
                    <Grid item>
                        <MediaCard
                            data={this.state.card}
                        /></Grid>
                </Grid>
                {this.playButton(this.state.attribute)}
            </Dialog>
        );
    }
}
