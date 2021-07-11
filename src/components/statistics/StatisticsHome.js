import React from 'react'
import {Paper} from "@material-ui/core";
import './../../styles/StatisticsHome.css'
import Ranking from "./Ranking";
import Button from "@material-ui/core/Button";
import DateInput from "./DateInput";
import SuperfriendsBackendClientInstance from "../../services/SuperfriendsBackendClient";
import {withCookies} from "react-cookie";
import Header from "../Header";

class StatisticsHome extends React.Component {
    backClient =  SuperfriendsBackendClientInstance
    initialStats =  {total: 0, in_process: 0, finished: 0}

    constructor(props) {
        super(props);
        this.state = {
            ranking: [],
            stats: this.initialStats,
            fromInitialDate: new Date('2014-08-18T21:11:54'),
            toInitialDate: Date.now()
        }
    }

    async componentDidMount() {
        console.log(this.backClient.jwt)
        let rankingFound = await this.backClient.getRanking()
        console.log(rankingFound)
        //won_matches, user_id, total_matches
        rankingFound.sort(this.compareRankings)
        console.log(rankingFound)
        this.setState({
            ranking: rankingFound ? rankingFound : []
        })
    }

    handleSearch = async () => {
        let stats = await this.backClient.getStatistics()
        this.setState({stats: stats})
    }

    compareRankings(r1, r2) {
        if (r1.won_matches > r2.won_matches) {
            return -1;
        }
        if (r1.won_matches < r2.won_matches) {
            return 1;
        }
        return 0;
    }


    handleSubmit = (e) => {
        e.preventDefault()
        //14/06/2021  -->  2021-06-14
        let from = this.parseDate(e.target[0].value);
        let until = this.parseDate(e.target[2].value);

        this.backClient.getStatisticsUserIdWithDates(this.props.cookies.get('GOOGLEID'), from, until).then(
            r => {
                r ? this.setState({stats: r}) : this.setState(this.initialStats)
            }
        )
    }

    handleClickPlayer = async (e) => {
        let newPlayerStats = await this.backClient.getStatisticsUserId(e.target.id)
        this.setState({stats: newPlayerStats})
    }

    // 14/06/2021 parse to 2021-06-14
    parseDate(date) {
        let dateSplitted = date.split("/")
        let day = dateSplitted[0]
        let month = dateSplitted[1]
        let year = dateSplitted[2]
        return year + "-" + month + "-" + day
    }

    onClickReset = (e) => {
        this.setState({
            stats: this.initialStats,
        })

    }

    render() {

        return (
            <div>
                <Header/>
                <h1>
                    Seleccioná un jugador para ver sus estadísticas
                </h1>
                <div style={{'padding': '32px'}}/>
                <div className="two-column-grid-equal">
                    <div>
                        <Ranking handleClickPlayer={this.handleClickPlayer} ranking={this.state.ranking}/>
                    </div>

                    <div style={{"justifyContent": "center"}}>
                        <div style={{"display": "flex", "justifyContent": "center"}}>

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
                                <form action="/" method="GET" onSubmit={this.handleSubmit}>

                                    <DateInput label="Desde" date={this.state.fromInitialDate}/>
                                    <DateInput label="Hasta" date={this.state.toInitialDate}/>

                                    <Button variant="contained" type="submit" color="primary"

                                            style={{margin: '16px', fontWeight: 'bold'}}> Buscar </Button>
                                </form>

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

                                </Paper>

                            </Paper>
                        </div>
                        <Button variant="contained"
                                color='secondary'
                                type="button"
                                style={{margin: '16px', fontWeight: 'bold'}}
                                onClick={this.onClickReset}> Reestablecer </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withCookies(StatisticsHome);