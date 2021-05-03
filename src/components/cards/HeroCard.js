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
        maxHeight: 300,
        marginTop: 10,
    },
    media: {
        maxHeight: 100,
        paddingTop: "56.25%",
    },
    content: {
        padding: "5%",
    },
});
class HeroCard extends React.Component {

    onClickCard = () => {
        if(this.props.onClickBuilder) {
            this.props.onClickBuilder(this.props.data)
        }
    }

    render() {
        return (
        <Card className={this.props.style.root} onClick={this.onClickCard}>
            <CardActionArea>
                <CardMedia
                    className={this.props.style.media}
                    image={this.props.data["image_url"]}
                    title={this.props.data["name"]}
                />
                <CardContent className={this.props.style.content}>
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

export default function MediaCard(props) {
    const classes = useStyles();
    return (<HeroCard style={classes} data={props.data} onClickBuilder={props.onClickBuilder}/>);
}
