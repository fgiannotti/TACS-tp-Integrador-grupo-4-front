import React from 'react'
import CardSearchBar from "./CardSearchBar";
import CardGrid from "../cards/CardGrid";
import '../../styles/CommonStyles.css';


export default class CardSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            search_query: "", 
            hero_list: []
        }
        this.search_by_name = this.search_by_name.bind(this)
    }

    search_by_name(name){
        //aca llama al servicio y busca por nombre
        const hero_list = [{"id": 1, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"},{"id": 2,"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"id": 3, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"id": 4, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"},{"id": 5, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"id": 6, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"id": 7, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"},{"id": 8, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"id": 9, "name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"}];
        this.setState({hero_list: hero_list});
        return name
    }
    render() {
        return (
            <>
                <h1>Buscador de Heroes</h1>
                <CardSearchBar
                    onRequestSearch={this.search_by_name}
                />
                <CardGrid 
                    cards={this.state.hero_list}
                    onClickBuilder={this.props.onClickBuilder}
                />
            </>
        );
    }
}
