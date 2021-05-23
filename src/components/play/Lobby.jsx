import React from 'react'
import Header from '../Header';
import Loader from "../utils/Loader";
import { withCookies } from "react-cookie";
import UserCard from "../cards/UserCard";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";


class Lobby extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const matchId = urlParams.get('matchId');

        this.state = {
            matchId: matchId,
            bothUsersInLobby: false,
        }
    }

    backendClient = new SuperfriendsBackendClient()

    componentDidMount() {
        let socket = new WebSocket("ws://localhost:9000/join-match/"+ this.state.matchId + "?userId=" + this.props.loggedUser);
        socket.onclose = () => {
            setTimeout(this.connectToBackendWithSockets, 5000);
        }
        socket.onmessage = (event) => {
            console.log(event.data)
            if (event.data.includes("READY")) {
                //READY:USERID1:USERID2
                const msg = event.data.split(":")
                const userId1 = msg[1]
                const userId2 = msg[2]
                const myId = this.props.cookies.get('GOOGLEID')

                let opponentId = myId !== userId1 ? userId1 : userId2
                this.backendClient.getPlayerById(opponentId).then((opponentData) => {
                        this.setState({
                            opponentId: opponentId,
                            bothUsersInLobby: true,
                            opponentImage: opponentData.image_url,
                            opponentUserName: opponentData.user_name
                        })
                    }
                )
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="flex-row justify-content-space-evenly" style={{margin: '15%'}}>
                <UserCard userName={this.props.cookies.get('USERNAME')} userImage={this.props.loggedUserImage} />
                {this.state.bothUsersInLobby ? 
                    <UserCard userName={this.state.opponentUserName} userImage={this.state.opponentImage} />
                :
                    <React.Fragment>                
                        <span style={{padding:'16px'}}> Esperando al otro jugador... </span>  
                        <Loader/>              
                    </React.Fragment>
                }
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(Lobby);