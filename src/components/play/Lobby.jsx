import React from 'react'
import Header from '../Header';
import Loader from "../utils/Loader";
import { withCookies } from "react-cookie";
import UserCard from "../cards/UserCard";
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import {Button} from "@material-ui/core";
import GreenCheck from "../utils/GreenCheck";
import {Redirect} from "react-router";
import ManagmenteSocket from "../management_socket/ManagementSocket";
class Lobby extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const matchId = urlParams.get('matchId');

        this.state = {
            matchId: matchId,
            bothUsersInLobby: false,
            redirectToMatch: false,
            redirectToGame: false,
            opponentReady: false,
            ready: false
        }
        ManagmenteSocket.matchId = urlParams.get('matchId')
        ManagmenteSocket.subscribeObserver(this)
        ManagmenteSocket.createConnection()
    }

    sendReadyToServer = () => {
        this.setState({
            ready: true
        })
        ManagmenteSocket.sendMessage("READY:"+ this.props.loggedUser)
    }

    backendClient = new SuperfriendsBackendClient()

    receiveMessage(message){
        if (message.data.includes("IN_LOBBY")){
            //IN_LOBBY:USERID1:USERID2
            const msg = message.data.split(":")
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

        if (message.data === "OPPONENT_READY") {
            this.setState({opponentReady: true})
        }

        if (message.data === "ALL_READY") {
            this.setState({redirectToGame: true})
            setTimeout(
                () => this.setState({

                    redirectToMatch: true
                }), 2000)
        }
    }

    render() {
        if (this.state.redirectToGame) return <Redirect to={"/game"} />
        if (this.state.redirectToMatch) return <Redirect to="/"/>
        return (
            <React.Fragment>
                <Header/>
                <div className="flex-row justify-content-space-evenly" style={{margin: '15%'}}>
                    <div style={{width: '20%'}}>
                    <UserCard userName={this.props.cookies.get('USERNAME')} userImage={this.props.loggedUserImage} />
                        {this.state.bothUsersInLobby && !this.state.ready ?
                            <Button variant="contained"
                                    color="default"
                                    style={{margin: '16px', fontWeight: 'bold'}}
                                    onClick={() => this.sendReadyToServer()}>¡Estoy listo!</Button>
                            : this.state.ready ?
                                <GreenCheck/> : null}
                    </div>
                {this.state.bothUsersInLobby ?
                    <div style={{width: '20%'}}>
                    <UserCard userName={this.state.opponentUserName} userImage={this.state.opponentImage} />
                        {this.state.opponentReady ? <GreenCheck /> : null}
                    </div>
                :
                    <div className="flex-column-center">
                        <span style={{padding:'16px'}}> Esperando al otro jugador... </span>  
                        <Loader/>              
                    </div>
                }
                </div>
            </React.Fragment>
        );
    }
}

export default withCookies(Lobby);