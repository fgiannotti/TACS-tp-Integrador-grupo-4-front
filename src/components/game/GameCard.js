import React from 'react';
import Button from "@material-ui/core/Button";
import {Box, ButtonGroup, Icon} from "@material-ui/core";
import MediaCard from "../cards/HeroCard.js"
import IconButton from "@material-ui/core/IconButton";
import ReactCardFlip from 'react-card-flip';
import { ReactComponent as BrainIcon } from '../../resources/images/brain.svg';
import { ReactComponent as HeightIcon } from '../../resources/images/height.svg';
import { ReactComponent as WeightIcon } from '../../resources/images/weight.svg';
import { ReactComponent as StrongIcon } from '../../resources/images/strong.svg';
import { ReactComponent as SpeedIcon } from '../../resources/images/speed.svg';
import { ReactComponent as PowerIcon } from '../../resources/images/power.svg';
import { ReactComponent as CombatIcon } from '../../resources/images/combat.svg';

export default class GameCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {selected_attribute: ""};
    }


    render() {
        return(
            <Box>
                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                    <IconButton aria-label="Altura">
                        <Icon type={HeightIcon}>
                        </Icon>
                    </IconButton>
                    <IconButton aria-label="Peso" disabled color="primary">
                        <Icon type={WeightIcon}>
                        </Icon>
                    </IconButton>
                    <IconButton color="Fuerza" aria-label="add an alarm">
                        <Icon type={StrongIcon}>
                        </Icon>
                    </IconButton>
                    <IconButton color="Inteligencia" aria-label="add to shopping cart">
                        <Icon type={BrainIcon}>
                        </Icon>
                    </IconButton>
                    <IconButton aria-label="Velocidad" disabled color="primary">
                        <Icon type={SpeedIcon}>
                        </Icon>
                    </IconButton>
                    <IconButton color="Poder" aria-label="add an alarm">
                        <Icon type={PowerIcon}>
                        </Icon>
                    </IconButton>
                    <IconButton color="Combate" aria-label="add to shopping cart">
                        <Icon type={CombatIcon}>
                        </Icon>
                    </IconButton>
                </ButtonGroup>
                <MediaCard
                    data={this.props.card}
                    onClickBuilder={this.props.onClickBuilder}/>
            </Box>);
    }

}


