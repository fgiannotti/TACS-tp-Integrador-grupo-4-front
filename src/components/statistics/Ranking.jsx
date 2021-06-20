import React from 'react'

class Ranking extends React.Component {
    //[{"user_id":"102400486230688279463","user_name":"FRANCO GIANNOTTI CALENS","won_matches":0,"total_matches":2},{"user_id":"104725077753706905086","user_name":"Franco Giannotti","won_matches":1,"total_matches":2}]
    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th data-type="numeric"> Puesto</th>
                    <th data-type="text-short"> Jugador</th>
                    <th data-type="text-short"> Jugadas</th>
                    <th data-type="text-short">Ganadas %</th>
                </tr>
                </thead>
                <tbody>
                {this.props.ranking.map((player, i) => (
                    <tr key={i} id={player.user_id} style={{"cursor":"pointer"}} onClick={this.props.handleClickPlayer}>
                        <td id={player.user_id}> {i + 1} </td>
                        <td id={player.user_id}>
                            {player.user_name}
                        </td>
                        <td id={player.user_id}> {player.total_matches} </td>
                        <td id={player.user_id}> {(player.won_matches / player.total_matches * 100).toFixed(1)}% ({player.won_matches})</td>

                    </tr>
                ))
                }
                </tbody>
            </table>
        );
    }
}

export default Ranking;