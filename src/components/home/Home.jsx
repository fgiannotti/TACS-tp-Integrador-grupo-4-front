import React from 'react';
import '../../styles/Home.css';
import Header from '../Header';
import { withCookies } from "react-cookie";
import CreateMatchScreen from "../play/CreateMatchScreen";
import Batman from "../../resources/images/batman.png"
import SuperfriendsBackendClientInstance from "../../services/SuperfriendsBackendClient";
import '../../styles/CommonStyles.css'
import HomeTitle from './Title';
import Invitation from './Invitation';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            decks: [],
            connectedUsers: [],
            invitation: {userInvited:"0",matchId:"0"},
        }

        console.log(this.state);
    }

    componentDidMount() {
        this.connectToBackendWithSockets(this.props.cookies.get('GOOGLEID'))
        this.backendClient.getDecks().then((decks) => this.setState({decks: decks}))
    }


    backendClient =  SuperfriendsBackendClientInstance

    keepAlive = (socket) => {
        socket.send(new Uint8Array([1]))
        setTimeout(() => this.keepAlive(socket), 50000)
    }

    connectToBackendWithSockets = (googleId) => {
        let socket = new WebSocket("ws://ec2-13-53-201-45.eu-north-1.compute.amazonaws.com:9000/home?userId=" + googleId);
        socket.onopen = () => {
            //send keep alive binary message
            this.keepAlive(socket)
        }

        socket.onmessage = (event) => {
            //INVITE:PLAYERID:MATCHID
            let inviteMsgType = "INVITE:"
            //localeCompare returns 0 if are equals
            let isInviteMsgType = event.data.includes(inviteMsgType)
            switch (isInviteMsgType){
                case true:
                    const invitation = event.data.split(":")
                    this.setState({
                        invitation: {
                            userInvited: invitation[1],
                            matchId:     invitation[2]
                        }
                    })
                    break

                default:
                    let connectedUsers = []
                    try {
                        connectedUsers = JSON.parse(event.data)
                        connectedUsers = connectedUsers.map(userString => JSON.parse(userString))
                    }catch(err) {
                        console.log(err)
                    }

                    this.setState({connectedUsers: connectedUsers})
            }

        }

        socket.onclose = (event) => {
            if(event.wasClean) {
                console.log("EVENT WAS CLOSED CLEANLY")
            } else {
                console.log("CLOSED CONNECTION CODE IS " + event.code)
            }
        }
        socket.onerror = (ev => console.log("socket on error code: "+ ev.code))
    }

    render() {
        return (
            <React.Fragment>
              <Header/>
                <HomeTitle/>
                {this.state.invitation.userInvited === this.props.cookies.get('GOOGLEID') ? <Invitation invitation={this.state.invitation}/> : <React.Fragment/>}
                <div className='flex-evenly'>
                    <img src={Batman} style={{maxHeight:'250px',alignSelf:'center'}}  alt={'Batman'}/>
                    <CreateMatchScreen decks={this.state.decks} connectedUsers={this.state.connectedUsers} userId={this.props.cookies.get('GOOGLEID')}/>
                    <img src={Batman} style={{maxHeight:'250px',alignSelf:'center'}}  alt={'Batman'}/>
                </div>
            </React.Fragment>
        )
    }


}
export default withCookies(Home);
