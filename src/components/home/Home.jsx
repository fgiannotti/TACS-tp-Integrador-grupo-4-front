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

        const user = {userName: this.props.userName, userId: this.props.userId}
        this.state = {
            decks: [],
            connectedUsers: [JSON.stringify(user)]
        }
    }

    backendClient = new SuperfriendsBackendClient()
    socket;

    updateConnectedUsers = (connectedUsers) => {
        this.setState({
            connectedUsers: connectedUsers
        })
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.socket = new WebSocket("ws://localhost:9000/home?userId=" + this.props.userId);
        SocketConnection.setInstance(this.socket)
        this.socket.onopen = () => {
            console.log("connected to server")
        }
        SocketConnection.socket.onmessage = (event) => {
            let connectedUsers = []
            try {
                connectedUsers = JSON.parse(event.data)
                connectedUsers = connectedUsers.map(userString => JSON.parse(userString))
            }catch(err) {
                console.log(err)
            }
            this.updateConnectedUsers(connectedUsers)
        }

        SocketConnection.socket.onclose = () => {
            alert("You've been disconnected from server")
        }

        this.backendClient.getDecks().then((decks) => this.setState({decks: decks}))
    }


    render() {
        return (
            <div>
              <Header/>
                <HomeTitle/>
                <div className='flex-evenly'>
                    <img src={Batman} style={{maxHeight:'250px',alignSelf:'center'}}  alt={'Batman'}/>
                    <CreateMatchScreen decks={this.state.decks} connectedUsers={this.state.connectedUsers} />
                </div>


            </div>
        )
    }

}
export default Home;
