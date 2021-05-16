import React, { Component } from 'react'
import {Card, Typography} from '@material-ui/core';

export default class HomeTitle extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{display:'flex',margin:'16px', placeContent: 'center'}}>
                <Card style={{ padding: '4px',backgroundColor: '#ffbe5c'}}>
                    <Typography variant="h3" component="h3">
                        Superamigos
                    </Typography>
                </Card>
                </div>
            </React.Fragment>

        )
    }
}
