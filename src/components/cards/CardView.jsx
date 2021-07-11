import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import Header from "../Header";
import CardSearch from "../card_finder/CardSearch";

import SuperfriendsBackendClientInstance from "../../services/SuperfriendsBackendClient";

const deckClient =  SuperfriendsBackendClientInstance;

class CardView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deckNameIsValid: false,
            saveDeckAlert: false,
            deckName: '',
            isLoading: true
        }

    }

    async componentDidMount() {
        document.body.style.backgroundColor = '#ffcc80';

        let heroList = await deckClient.getCardsByName("b");
        console.log("heroList:")
        console.log(heroList)

        this.setState({selectedHeroList: heroList})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/decks"/>
        }

        return (
            <React.Fragment>
                <Header />
                <div className='flex-row-center'>
                    <div className='search-container' style={{'width':'auto'}}>
                        <CardSearch onClickBuilder={this.addSelectedHero}/>
                    </div>
                </div>

            </React.Fragment>
        );
    }

}

export default CardView;