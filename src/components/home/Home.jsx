import {Card, Typography} from '@material-ui/core';
import React from 'react';
import '../../styles/Home.css';
import Header from '../home/Header';
import CardImage from './cardExample.png'
import CreateMatchScreen from "../play/CreateMatchScreen";
import Batman from "../../resources/images/batman.png"
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";
import '../../styles/CommonStyles.css'
import SocketConnection from "../../socketEvents";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            connectedUsers: []
        }
    }

    backendClient = new SuperfriendsBackendClient()
    socket;
    userId = Math.random()

    changeState = (connectedUsers) => {
        this.setState({
            connectedUsers: Array(connectedUsers.substring(4, connectedUsers.length -1))
        })
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.socket = new WebSocket("ws://localhost:9000/?name=" + this.userId);
        SocketConnection.setInstance(this.socket)
        this.socket.onopen = () => {
            console.log("connected to server")
        }
        SocketConnection.socket.onmessage = (event) => {
            this.changeState(event.data)
        }

        this.backendClient.getDecks().then((decks) => this.setState({decks: decks}))
    }


    render() {
        return (
            <div>
              <Header/>

              <div style={{display:'flex',margin:'16px', placeContent: 'center'}}>
                <Card style={{ padding: '4px',backgroundColor: '#ffbe5c'}}>

                    <Typography variant="h3" component="h3">
                        Superamigos
                    </Typography>
                </Card>
              </div>

                <CreateMatchScreen decks={this.state.decks} connectedUsers={this.state.connectedUsers} />

            <span className="m2" style={{padding:'32px', fontWeight: 'bold'}}>
                ¿Cómo jugar?
            </span>
            <div align="center">
                <div className="flex-row justify-content-center">
                <p align={'justify'} style={{paddingLeft:'32px'}}>

                    La partida se desarrolla entre 2 jugadores en modalidad uno contra uno.
                    <br/>Se toma la baraja, se mezcla y se reparten en cantidades iguales a cada jugador quedando las cartas boca abajo.
                    <br/>Se lanza una moneda para decidir que jugador será el primero en jugar.
                    <br/>
                    <br/>Cada jugador toma la carta de arriba sin mostrarla al adversario, al enfrentamiento entre las 2 cartas se lo llamará duelo.
                    <br/>A continuación el jugador que tenga el turno seleccionará un atributo con el que ambas cartas competirán.
                    <br/>Ambos jugadores cantarán el valor de su carta para ese atributo y el ganador se llevará ambas cartas.
                    <br/>En caso de empate cada uno se llevará su carta.
                    Las cartas ganadas se colocarán en el mazo de premios.
                </p>
                    <img src={Batman}  alt={'Batman'}/>
                </div>
                <span style={{padding:'32px',fontWeight: 'bold'}}>
                    Fin de la partida
                </span>

                <p align={'justify'} className="bodyText" style={{paddingLeft:'32px'}}>
                    Al finalizar las cartas de ambos mazos se preocederá al conteo de cartas ganadas.
                    <br/>El jugador que tenga más cartas ganadas será declarado ganador.
                    <br/>En caso de que los dos participantes tengan una cantidad igual de cartas se declarará el empate.
                </p>
            </div>
            <img src={CardImage} alt='card' width={'20%'}/>
            </div>
        )
    }

}
export default Home;
