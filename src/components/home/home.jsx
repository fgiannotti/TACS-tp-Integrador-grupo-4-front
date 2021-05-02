import { Card, Typography } from '@material-ui/core';
import React from 'react';
import '../../styles/Home.css';
import Header from  '../home/Header';

class Home extends React.Component {

    componentDidMount(){
        document.body.style.backgroundColor = '#ffcc80'
    }

    render() {
        return (
            <div>
              <Header/>
              
              <div style={{display:'flex',margin:'16px',placeContent: 'center'}}>
                <Card style={{ padding: '4px',backgroundColor: '#ffbe5c'}}>

                    <Typography variant="h3" component="h3">
                        Superamigos
                    </Typography>
                </Card>
              </div>

              <Typography align={'left'} component="body" paragraph={true} style={{padding:'32px'}}>
                ¿Cómo jugar?
              </Typography>

              {this.props.isAdmin ? console.log("admin"): <React.Fragment/>}
            </div>
        )
    }

}
export default Home;
