import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AttributeGrid from './AttributeGrid'

class HeroCard extends React.Component {
    styles = {
        root: {
            maxWidth: '200px',
            maxHeight:'400px',
        },
        media: {
            height: '150px',
            backgroundPosition:'top',
        },
        content: {
            padding: "5%",
        },
    }

    onClickCard = () => {
        if (this.props.onClickBuilder) {
            this.props.onClickBuilder(this.props.card)
        }
    }

    render() {
        return (
            <Card style={this.styles.root} onClick={this.onClickCard}>
                <CardActionArea>
                    <CardMedia
                        style={this.styles.media}
                        image={this.props.card["image_url"]}
                        title={this.props.card["name"]}
                    />
                    <CardContent style={this.styles.content}>
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
    return (<HeroCard card={props.card} onClickBuilder={props.onClickBuilder}/>);
}
