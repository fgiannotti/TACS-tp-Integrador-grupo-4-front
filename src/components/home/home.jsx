import React from 'react';
import '../../styles/Home.css';
import Header from  '../home/Header';

class Home extends React.Component {
    render() {
        return (
            <div>
              <Header/>
              {this.props.isAdmin ? console.log("admin"): <React.Fragment/>}
            </div>
        )
    }

}
export default Home;
