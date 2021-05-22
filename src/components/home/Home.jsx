import React from 'react';
import '../../styles/Home.css';
import Header from '../Header';
import { withCookies } from "react-cookie";
import CreateMatchScreen from "../play/CreateMatchScreen";
import Batman from "../../resources/images/batman.png"
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import '../../styles/CommonStyles.css'
import HomeTitle from './Title';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            decks: [],
            connectedUsers: [],
        }

        console.log(this.state);
    }

    componentDidMount() {
        this.connectToBackendWithSockets(this.props.cookies.get('GOOGLEID'))
        this.backendClient.getDecks().then((decks) => this.setState({decks: decks}))
    }


    backendClient = new SuperfriendsBackendClient()

    connectToBackendWithSockets = (googleId) => {
        let socket = new WebSocket("ws://localhost:9000/home?userId=" + googleId);
        socket.onopen = () => {
            console.log("on open: connected to server")
        }

        socket.onmessage = (event) => {
            let connectedUsers = []
            try {
                connectedUsers = JSON.parse(event.data)
                connectedUsers = connectedUsers.map(userString => JSON.parse(userString))
            }catch(err) {
                console.log(err)
            }
            //localStorage.setItem('connectedUsers',JSON.stringify(connectedUsers))
            this.setState({connectedUsers: connectedUsers})
        }

        socket.onclose = () => {
            setTimeout(() => this.connectToBackendWithSockets(googleId), 5000);
        }
    }

    render() {
        return (
            <React.Fragment>
              <Header/>
                <HomeTitle/>
                <div className='flex-evenly'>
                    <img src={Batman} style={{maxHeight:'250px',alignSelf:'center'}}  alt={'Batman'}/>
                    <CreateMatchScreen decks={this.state.decks} connectedUsers={this.state.connectedUsers} userId={this.props.cookies.get('GOOGLEID')}/>
                </div>
            </React.Fragment>
        )
    }


}
export default withCookies(Home);

/* In case we need to persist connected users in local storage to have them in multiple windows....
    getUsersFromLocalStorage = () => {
        let connectedUsers = [{user_name:this.props.cookies.get('USERNAME'),user_id:this.props.cookies.get('GOOGLEID')}]
        
        let connectedUsersStr = localStorage.getItem('connectedUsers')
        if (connectedUsersStr !== null){
            try {
                connectedUsers = JSON.parse(connectedUsersStr)
            }catch(e){
                console.log(e)
            }
        }
        return connectedUsers
    }
*/