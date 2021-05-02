import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as BrainIcon } from '../resources/images/brain.svg';
import SvgIcon from '@material-ui/core/SvgIcon';

var useStyles = makeStyles({
    root: {
        maxWidth: 275,
    },
    media: {
        height: 225,
    },
});
class Cards extends React.Component {
    render() {
        return (<Card className={this.props.style.root}>
            <CardActionArea>
                <CardMedia
                    className={this.props.style.media}
                    image="https:\/\/www.superherodb.com\/pictures2\/portraits\/10\/100\/10441.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Batman
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <SvgIcon component={BrainIcon} viewBox="0 0 600 476.6" />
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>);
}
}

export default function MediaCard() {
    const classes = useStyles();

    return (<Cards style={classes}/>);
}
