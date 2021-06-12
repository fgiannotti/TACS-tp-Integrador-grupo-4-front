import React from 'react'

class Faq extends React.Component {

    render() {
        return (
            <table>
                <thead>
                <tr>
                    <th data-type="numeric"> Puesto  </th>
                    <th data-type="text-short"> Jugador </th>
                    <th data-type="text-short"> Jugadas </th>
                    <th data-type="text-short">Ganadas % </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Lani</td>
                    <td>60</td>
                    <td>50% (30)</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Israel</td>
                    <td>100</td>
                    <td>25% (25)</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Eveleen</td>
                    <td>10</td>
                    <td>90% (9)</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Faq;