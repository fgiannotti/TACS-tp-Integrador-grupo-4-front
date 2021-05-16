import CardImage from './cardExample.png'
import Batman from "../../resources/images/batman.png"
import React from 'react'

class Faq extends React.Component {

    render() { 
        return ( 
        <div>
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
        );
    }
}
 
export default Faq;