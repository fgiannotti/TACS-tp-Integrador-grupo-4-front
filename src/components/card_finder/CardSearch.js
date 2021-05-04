import React from 'react'
import CardSearchBar from "./CardSearchBar";
import CardGrid from "../cards/CardGrid";
import '../../styles/CommonStyles.css';
import SuperfriendsBackendClient from "../../SuperfriendsBackendClient";


export default class CardSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_query: "",
            hero_list: []
        }
        this.search_by_name = this.search_by_name.bind(this)
    }

    cardsClient = new SuperfriendsBackendClient()

    search_by_name(name) {
        this.cardsClient.getCardsByName(name).then((cards) => {
            this.setState({hero_list: cards})
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Buscador de Heroes</h1>
                <CardSearchBar
                    onRequestSearch={this.search_by_name}
                />
                <CardGrid
                    cards={this.state.hero_list}
                    onClickBuilder={this.props.onClickBuilder}
                />
            </React.Fragment>
        );
    }
}
