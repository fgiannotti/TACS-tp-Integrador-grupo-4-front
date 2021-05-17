import React from 'react';
import '../../styles/Home.css';
import Header from '../Header';
import CreateMatchScreen from "../play/CreateMatchScreen";
import Batman from "../../resources/images/batman.png"
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import '../../styles/CommonStyles.css'
import HomeTitle from './Title';

class Home extends React.Component {
    constructor(props) {
        super(props);

        const user = {userName: this.props.userName, userId: this.props.userId}
        this.state = {
            decks: [],
            connectedUsers: [JSON.stringify(user)]
        }
    }

    backendClient = new SuperfriendsBackendClient()

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.backendClient.getDecks().then((decks) => this.setState({decks: decks}))
    }


    render() {
        return (
            <React.Fragment>
              <Header/>
                <HomeTitle/>
                <div className='flex-evenly'>
                    <img src={Batman} style={{maxHeight:'250px',alignSelf:'center'}}  alt={'Batman'}/>
                    <CreateMatchScreen decks={this.state.decks} connectedUsers={this.props.connectedUsers} userId={this.props.userId}/>
                </div>
            </React.Fragment>
        )
    }

}
export default Home;
