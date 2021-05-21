import React from 'react'
import Loader from "../utils/Loader";


class Lobby extends React.Component {
    constructor(props) {
        super(props);
        const urlParams = new URLSearchParams(window.location.search);
        const matchId = urlParams.get('matchId');

        this.state = {
            matchId: matchId
        }
    }

    componentDidMount() {
        let socket = new WebSocket("ws://localhost:9000/join-match/"+ this.state.matchId + "?userId=" + this.props.loggedUser);
        socket.onopen = () => {
            console.log("connected to server")
        }
    }

    render() {
        return (
            <React.Fragment>
                <span> Esperando al otro jugador </span>
                <img style={{borderRadius: '50%'}} src={this.props.loggedUserImage} alt={'Usuario'}/>
                <Loader/>
            </React.Fragment>
        );
    }
}

export default Lobby;