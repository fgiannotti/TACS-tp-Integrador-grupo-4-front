import { Card, Typography } from '@material-ui/core';
import React from 'react';
import '../../styles/Home.css';
import Header from  '../home/Header';
import CardImage from './cardExample.png'
import CreateMatchScreen from "../play/CreateMatchScreen";
import Batman from "../../resources/images/batman.png"
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            decks: []
        }
    }

    decksClient = new SuperfriendsBackendClient()

    componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80'
        this.decksClient.getDecks().then((decks) => this.setState({decks: decks}))
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

                <CreateMatchScreen decks={this.state.decks} />

            <Typography align={'center'} className="bodyText" component="p" paragraph={true} style={{padding:'32px',fontWeight: 'bold'}}>
                ¿Cómo jugar?
            </Typography>
            <div align="center">
                <div className="flex-row justify-content-center">
                <Typography align={'justify'} className="bodyText" component="p" paragraph={true} style={{paddingLeft:'32px'}}>

                    La partida se desarrolla entre 2 jugadores en modalidad uno contra uno.
                    <br/>Se toma la baraja, se mezcla y se reparten en cantidades iguales a cada jugador quedando las cartas boca abajo.
                    <br/>Se lanza una moneda para decidir que jugador será el primero en jugar.
                    <br/>
                    <br/>Cada jugador toma la carta de arriba sin mostrarla al adversario, al enfrentamiento entre las 2 cartas se lo llamará duelo.
                    <br/>A continuación el jugador que tenga el turno seleccionará un atributo con el que ambas cartas competirán.
                    <br/>Ambos jugadores cantarán el valor de su carta para ese atributo y el ganador se llevará ambas cartas.
                    <br/>En caso de empate cada uno se llevará su carta.
                    Las cartas ganadas se colocarán en el mazo de premios.
                </Typography>
                    <img src={Batman}  alt={'Batman'}/>
                </div>
                <Typography align={'center'} className="bodyText" component="p" paragraph={true} style={{padding:'32px',fontWeight: 'bold'}}>
                    Fin de la partida
                </Typography>

                <Typography align={'justify'} className="bodyText"  component="p" paragraph={true} style={{paddingLeft:'32px'}}>
                    Al finalizar las cartas de ambos mazos se preocederá al conteo de cartas ganadas.
                    <br/>El jugador que tenga más cartas ganadas será declarado ganador.
                    <br/>En caso de que los dos participantes tengan una cantidad igual de cartas se declarará el empate.
                </Typography>
            </div>
            <img src={CardImage} alt='card' width={'20%'}/>
              {this.props.isAdmin ? console.log("admin"): <React.Fragment/>}
            </div>
        )
    }

}
export default Home;
