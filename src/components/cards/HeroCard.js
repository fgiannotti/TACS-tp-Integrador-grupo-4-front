import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import AttributeGrid from './AttributeGrid'

var useStyles = makeStyles({
    root: {
        maxWidth: 200,
        marginTop: 10,
    },
    media: {
        height: 150,
        paddingTop: "56.25%",
    },
    content: {
        padding: "5%",
    },
});

class HeroCard extends React.Component {

    onClickCard = () => {
        if (this.props.onClickBuilder) {
            this.props.onClickBuilder(this.props.card)
        }
    }

    render() {
        return (
            <Card className={this.props.style.root} onClick={this.onClickCard}>
                <CardActionArea>
                    <CardMedia
                        className={this.props.style.media}
                        image={this.props.card["image_url"]}
                        title={this.props.card["name"]}
                    />
                    <CardContent className={this.props.style.content}>
                        <Typography gutterBottom variant="h6" component="h2">
                            {this.props.card["name"]}
                        </Typography>
                        <AttributeGrid powerStats={this.props.card["power_stats"]}/>
                    </CardContent>
                </CardActionArea>
            </Card>);
    }
}

export default function MediaCard(props) {
    const classes = useStyles();
    return (<HeroCard style={classes} card={props.card} onClickBuilder={props.onClickBuilder}/>);
}
