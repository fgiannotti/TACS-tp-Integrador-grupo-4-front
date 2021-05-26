import React, {Component} from 'react';
import {Card} from "@material-ui/core";

class UserCard extends Component {
    render() {
        return (
            <Card className="p2 flex-column-center justify-content-space-evenly"
                  style={{backgroundColor: '#cbb2ca', borderRadius: '10%'}}>
                <img className="m2" style={{borderRadius: '50%'}} src={this.props.userImage} alt={'Usuario'}/>
                <span style={{fontWeight: 'bold'}} className="m2">{this.props.userName}</span>
            </Card>
        );
    }
}

export default UserCard;