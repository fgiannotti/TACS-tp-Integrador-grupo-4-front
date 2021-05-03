import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import AttributeGrid from './AttributeGrid'

var useStyles = makeStyles({
    root: {
        maxWidth: 200,
    },
    media: {
        height: 150,
    },
});
class Cards extends React.Component {
    render() {
        return (<Card className={this.props.style.root}>
            <CardActionArea>
                <CardMedia
                    className={this.props.style.media}
                    image={this.props.data["image_url"]}
                    title={this.props.data["name"]}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {this.props.data["name"]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        < AttributeGrid data={this.props.data["power_stats"]}/>
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>);
    }
}

export default function MediaCard() {
    const classes = useStyles();

    return (<Cards style={classes} data={{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https:\\/\\/www.superherodb.com\\/pictures2\\/portraits\\/10\\/100\\/10441.jpg"}}/>);
}
