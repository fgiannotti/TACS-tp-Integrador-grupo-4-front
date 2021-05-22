import React from 'react'
import Header from '../Header';
import Loader from "../utils/Loader";
import { withCookies } from "react-cookie";


class Lobby extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const matchId = urlParams.get('matchId');

        this.state = {
            matchId: matchId,
            bothUsersInLobby: false
        }
    }

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

                let opponentId = myId === userId1 ? userId1 : userId2

                //fijarse desde acá como pedirle la imagen al backend 
                this.setState({opponentId: opponentId, bothUsersInLobby:true})
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <img style={{borderRadius: '50%'}} src={this.props.loggedUserImage} alt={'Usuario'}/>
                {this.state.bothUsersInLobby ? 
                    //acá agregar imagen del otro gordo y su name
                    <React.Fragment>
                        <span>Oponente: {this.state.opponentId} </span>
                    </React.Fragment>
                :
                    <React.Fragment>                
                        <span style={{padding:'16px'}}> Esperando al otro jugador... </span>  
                        <Loader/>              
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default withCookies(Lobby);