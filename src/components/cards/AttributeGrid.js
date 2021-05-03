import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as BrainIcon } from '../../resources/images/brain.svg';
import { ReactComponent as HeightIcon } from '../../resources/images/height.svg';
import { ReactComponent as WeightIcon } from '../../resources/images/weight.svg';
import { ReactComponent as StrongIcon } from '../../resources/images/strong.svg';
import { ReactComponent as SpeedIcon } from '../../resources/images/speed.svg';
import { ReactComponent as PowerIcon } from '../../resources/images/power.svg';
import { ReactComponent as CombatIcon } from '../../resources/images/combat.svg';
import SvgIcon from '@material-ui/core/SvgIcon';


class AttributeGrid extends React.Component {
    height = 0;
    weight = 0;
    combat = 0;
    intelligence = 0;
    strength = 0;
    power = 0;
    speed = 0;
    constructor(props) {
        super(props);
        this.height = this.props.data.filter(power => power.name === "height")[0].value;
        this.weight = this.props.data.filter(power => power.name === "weight")[0].value;
        this.intelligence = this.props.data.filter(power => power.name === "intelligence")[0].value;
        this.strength = this.props.data.filter(power => power.name === "strength")[0].value;
        this.power = this.props.data.filter(power => power.name === "power")[0].value;
        this.speed = this.props.data.filter(power => power.name === "speed")[0].value;
        this.combat = this.props.data.filter(power => power.name === "combat")[0].value;
    }
    style() {
        return (makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            paper: {
                padding: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
        })));
    }
    formRow(item, icon, title) {
        return (
            <React.Fragment>
                <Grid item xs={6} title={title}>
                    <Paper className={this.style().paper} >
                    <SvgIcon component={icon} viewBox="-10 -25 600 476.6" style={{ fontSize: 20 }}  />
                        {item} </Paper>
                </Grid>
            </React.Fragment>
        );
    }
    render() {
        return (
            <div className={this.style().root}>
                <Grid container spacing={1} >
                    <Grid container item xs={12} spacing={1} justify="center" alignItems="center">
                        {this.formRow(String(this.height),HeightIcon, "Altura")}
                        {this.formRow(String(this.weight),WeightIcon, "Peso")}
                    </Grid>
                    <Grid container item xs={12} spacing={1} justify="center">
                        {this.formRow(String(this.intelligence),BrainIcon, "Inteligencia")}
                        {this.formRow(String(this.speed),SpeedIcon, "Velocidad")}
                    </Grid>
                    <Grid container item xs={12} spacing={1} justify="center">
                        {this.formRow(String(this.power),PowerIcon, "Poder")}
                        {this.formRow(String(this.combat),CombatIcon, "Combate")}
                    </Grid>
                    <Grid container item xs={12} spacing={1}  justify="center">
                        {this.formRow(String(this.strength),StrongIcon, "Fuerza")}
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default AttributeGrid