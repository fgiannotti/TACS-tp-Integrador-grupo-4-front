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
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";

class StatisticsHome extends React.Component {
    backClient = new SuperfriendsBackendClient()
    constructor(props) {
        super(props);
        this.state = {
            ranking: [],
            stats: {total:0, in_process:0, finished:0}
        }
    }

    async componentDidMount() {
        let rankingFound = await this.backClient.getRanking()
        console.log(rankingFound)
        this.setState({
            ranking: rankingFound ? rankingFound : []
        })
    }

    handleSearch = async () => {
        let stats = await this.backClient.getStatistics()
        this.setState({stats: stats})
    }

    render() {
        return (
            <div>
                <AppBar position="static" color='secondary'>
                    <Toolbar/>
                </AppBar>
                <div style={{'padding': '32px'}}/>
                <div className="two-column-grid-equal">
                    <div>
                        <Ranking ranking={this.state.ranking}/>
                    </div>

                    <div style={{"justify-content": "center"}}>
                        <div style={{"display": "flex", "justify-content": "center"}}>

                            <Paper className="container align-items-center flex-column-space-around p1"
                                   style={{
                                       minWidth: '50%',
                                       minHeight: '50%',
                                       margin: '4px',
                                       backgroundColor: '#8aa397',
                                       borderRadius: '10%'
                                   }}>
                                <span className="m1" style={{fontSize: "x-large", fontWeight: "bold"}}> Partidas </span>
                                <span className="m1"> Estadisticas de partidas por fecha </span>

                                <DateInput label="Desde" date={ new Date('2014-08-18T21:11:54')}/>
                                <DateInput label="Hasta" date={ Date.now()}/>

                                <Button variant="contained" color="primary" onClick={this.handleSearch}
                                        style={{margin: '16px', fontWeight: 'bold'}}> Buscar </Button>

                                <Paper style={{minWidth: '70%', backgroundColor: "lightgray", marginTop: '8px'}}>
                                    <div style={{"display": "grid", "margin": "8px"}}>
                                        <div className="match-list">
                                            <span> Total </span>
                                            <span> {this.state.stats.total} </span>
                                        </div>
                                        <div className="match-list">
                                            <span> En curso </span>
                                            <span> {this.state.stats.in_process} </span>
                                        </div>
                                        <div className="match-list">
                                            <span> Terminadas </span>
                                            <span> {this.state.stats.finished} </span>
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