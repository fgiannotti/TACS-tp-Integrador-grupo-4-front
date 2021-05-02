import React from 'react';
import GoogleSignOut from '../login/GoogleSignOut';

class Home extends React.Component {
    render() {
        return (
            <div style={{backgroundColor:'#ffcc80'}}>
                <h1>Homeee</h1>
                <GoogleSignOut/>
                {this.props.isAdmin ? <div style={{backgroundColor:'#ffcc88',minHeight:'300px'}}/>: <React.Fragment/>}
            </div>
        )
    }

}
export default Home;
