import React from 'react'
import {
    AppBar,
    FormControl,
    Paper,
    Toolbar
} from "@material-ui/core";
import './../../styles/StatisticsHome.css'
import Ranking from "./Ranking";
import Button from "@material-ui/core/Button";
import DateInput from "./DateInput";

class StatisticsHome extends React.Component {

    render() {
        return (
            <div>
                <AppBar position="static" color='secondary'>
                    <Toolbar/>
                </AppBar>
                <div style={{'padding': '32px'}}/>
                <div className="two-column-grid-equal">
                    <div>
                        <Ranking/>
                    </div>

                    <div style={{"justify-content": "center"}}>
                        <div style={{"display": "flex", "justify-content": "center"}}>

                            <Paper className="container align-items-center flex-column-space-around p1"
                                   style={{
                                       minWidth: '50%',
                                       minHeight: '50%',
                                       margin: '4px',
                                       backgroundColor: '#B3C0A4',
                                       borderRadius: '10%'
                                   }}>
                                <span className="m1" style={{fontSize: "x-large", fontWeight: "bold"}}> Partidas </span>
                                <span className="m1"> Estadisticas de partidas por fecha </span>
                                <DateInput label="Desde"/>
                                <DateInput label="Hasta"/>

                                <Button variant="contained"
                                        color="primary"
                                        style={{margin: '16px', fontWeight: 'bold'}}> Buscar </Button>

                                <Paper style={{minWidth: '70%', backgroundColor: "lightgray", marginTop: '8px'}}>
                                    <div style={{"display": "grid", "margin": "8px"}}>
                                        <div className="match-list">
                                            <span> Total </span>
                                            <span> 11 </span>
                                        </div>
                                        <div className="match-list">
                                            <span> En curso </span>
                                            <span> 2 </span>
                                        </div>
                                        <div className="match-list">
                                            <span> Terminadas </span>
                                            <span> 9 </span>
                                        </div>

                                    </div>


                                    <FormControl fullWidth={true} component="fieldset">
                                        {/*seleccionar */}
                                    </FormControl>
                                </Paper>

                            </Paper>
                        </div>
                        <Button variant="contained"
                                color='secondary'
                                style={{margin: '16px', fontWeight: 'bold'}}> Reestablecer </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatisticsHome;