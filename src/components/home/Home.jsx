import React from 'react';
import '../../styles/Home.css';
import Header from '../Header';
import CreateMatchScreen from "../play/CreateMatchScreen";
import Batman from "../../resources/images/batman.png"
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import '../../styles/CommonStyles.css'
import SocketConnection from "../../socketEvents";
import HomeTitle from './Title';

class Home extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            decks: [],
            connectedUsers: [this.props.userId],
            userName: this.props.userName
        }
    }

    backendClient = new SuperfriendsBackendClient()
    socket;

    changeState = (connectedUsers) => {
        this.setState({
            connectedUsers: Array(connectedUsers.substring(4, connectedUsers.length -1))
        })
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.socket = new WebSocket("ws://localhost:9000/?userId=" + this.props.userId);
        SocketConnection.setInstance(this.socket)
        this.socket.onopen = () => {
            console.log("connected to server")
        }
        SocketConnection.socket.onmessage = (event) => {
            console.log(event)
            this.changeState(event.data)
        }

        this.backendClient.getDecks().then((decks) => this.setState({decks: decks}))
    }


    render() {
        return (
            <div>
              <Header/>
                <HomeTitle/>
                <div className='flex-evenly'>
                    <img src={Batman}  alt={'Batman'}/>
                    <CreateMatchScreen decks={this.state.decks} connectedUsers={this.state.connectedUsers} />
                </div>


            </div>
        )
    }

}
export default Home;
