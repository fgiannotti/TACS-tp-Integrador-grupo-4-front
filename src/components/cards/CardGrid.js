import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MediaCard from './HeroCard'

export default class CardGrid extends React.Component{
     classes = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
    render() {
       return(
           <Grid container spacing={3}>
            {this.props.cards.map(card => (
                <Grid item >
                    <MediaCard 
                        data={card} 
                        onClickBuilder={this.props.onClickBuilder}
                    />
                </Grid>
            ))}
        </Grid>
       );
    }



}
