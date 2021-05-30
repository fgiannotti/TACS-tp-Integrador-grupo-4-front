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

export default class SimpleCardDialog extends React.Component {
    styles = {
        dialog: {
            display: 'flex',
            height:500,
            width: 300, 
        },
        icon:{
            height:"50%",
            width: '50%',
            maxHeight:65,
            background:"#CACFD2"
        },
        buttonGroup: {
            maxWidth:25,
            maxHeight:450,
            marginRight:32
        },

        imageFocus:{
            background:'#2299540', //chequear
            height:"100%",
            width: '100%',
            maxHeight:65
        },
        image:{
            height:"80%",
            width: '80%',
            maxHeight:65
        },
    }
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

    applyStyle = (attr) => {
        return this.state.attribute === attr ? this.styles.imageFocus : this.styles.image
    }

    playButton = (attr) => {
        if(attr !== "" ){
            return (<Button variant="contained" onClick={this.handleClose} color={"secondary"}>Jugar</Button>);
        }
    }

    render() {
        return (
            <Dialog onClose={this.props.handleCancel} style={{display:'flex',justifyContent:'center'}} aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle id="simple-dialog-title">Elegir un atributo</DialogTitle>
                <Grid container style={this.styles.dialog}>
                    <ButtonGroup title="botones" variant="outlined" color="secondary" size="small"
                                 aria-label="outlined secondary button group" orientation="vertical"
                                 style={this.styles.buttonGroup}>
                        <IconButton aria-label="Altura" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Altura")}>
                            <HeightIcon style={this.applyStyle("Altura")}/>
                        </IconButton>
                        <IconButton aria-label="Peso" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Peso")}>
                            <WeightIcon style={this.applyStyle("Peso")}/>
                        </IconButton>
                        <IconButton aria-label="Fuerza" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Fuerza")}>
                            <StrongIcon style={this.applyStyle("Fuerza")}/>
                        </IconButton>
                        <IconButton aria-label="Inteligencia" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Inteligencia")}>
                            <BrainIcon style={this.applyStyle("Inteligencia")}/>
                        </IconButton>
                        <IconButton aria-label="Velocidad" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Velocidad")}>
                            <SpeedIcon style={this.applyStyle("Velocidad")}/>
                        </IconButton>
                        <IconButton aria-label="Poder" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Poder")}>
                            <PowerIcon style={this.applyStyle("Poder")}/>
                        </IconButton>
                        <IconButton aria-label="Combate" size={"small"} style={this.styles.icon}
                                    onClick={() => this.handleListAttributeClick("Combate")}>
                            <CombatIcon style={this.applyStyle("Combate")}/>
                        </IconButton>
                    </ButtonGroup>
                        <MediaCard card={this.props.card}/>
                </Grid>
                {this.playButton(this.state.attribute)}
            </Dialog>
        );
    }
}
