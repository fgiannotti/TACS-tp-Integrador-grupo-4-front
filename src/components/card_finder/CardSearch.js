import React from 'react'
import CardSearchBar from "./CardSearchBar";
import CardGrid from "../cards/CardGrid";
import '../../styles/CommonStyles.css';
import SuperfriendsBackendClientInstance from "../../services/SuperfriendsBackendClient";
import Loader from '../utils/Loader';


export default class CardSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: "",
            hero_list: [],
            isSearching: false,
        }
        this.search_by_name = this.search_by_name.bind(this)
    }

    cardsClient = SuperfriendsBackendClientInstance

    search_by_name(name) {
        this.setState({isSearching: true})
        this.cardsClient.getCardsByName(name).then((cards) => {
            this.setState({hero_list: cards, isSearching:false})
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Buscador de Heroes</h1>
                 <CardSearchBar onRequestSearch={this.search_by_name}/>
                 {this.state.isSearching ? <Loader/> : <React.Fragment/>}
                <CardGrid
                    cards={this.state.hero_list}
                    onClickBuilder={this.props.onClickBuilder}
                />
            </React.Fragment>
        );
    }
}
