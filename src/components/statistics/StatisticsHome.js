import React from 'react'
import {
    AppBar,
    Divider,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Toolbar
} from "@material-ui/core";
import './../../styles/StatisticsHome.css'
import Ranking from "./Ranking";
import {Autocomplete} from "@material-ui/lab";
import Button from "@material-ui/core/Button";
class StatisticsHome extends React.Component {

    render() {
        return (
            <div>
                <AppBar position="static" color='secondary'>
                    <Toolbar/>
                </AppBar>
                <div style={{'padding':'32px'}}/>
                <div className="two-column-grid-equal">
                    <div>
                        <Ranking/>
                    </div>

                    <div style={{"display":"flex","justify-content":"center"}}>
                        <Paper className="container align-items-center flex-column-space-around p1"
                               style={{
                                   minWidth: '50%',
                                   minHeight: '50%',
                                   margin: '8px',
                                   backgroundColor: '#B3C0A4',
                                   borderRadius: '10%'
                               }}>
                        <span className="m1" style={{fontSize: "x-large", fontWeight: "bold"}}> Partidas </span>
                            <span className="m1"> Estadisticas de partidas por fecha </span>

                            <Paper style={{minWidth: '70%', backgroundColor: "lightgray"}}>
                                <div style={{"display":"grid"}}>
                                    <span> Total </span>
                                    <span> En curso </span>
                                    <span> Terminadas </span>
                                    <span> Canceladas </span>
                                </div>


                                <FormControl fullWidth={true} component="fieldset">
                                    {/*seleccionar */}
                                </FormControl>
                            </Paper>

                            <Button  variant="contained"
                                    color="primary"
                                    style={{margin: '16px', fontWeight: 'bold'}}
                                    onClick={() => this.createAndSendToLobby()}> Buscar </Button>
                        </Paper>
                    </div>
                </div>

            </div>
        );
    }
}

export default StatisticsHome;