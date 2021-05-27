import React, {Component} from 'react';
import GreenTick from '../../resources/images/green_tick.png'

class GreenCheck extends Component {
    render() {
        return (
            <img style={{margin:'5%'}} width={'30%'} src={GreenTick} alt={'ready'}/>
        );
    }
}

export default GreenCheck;