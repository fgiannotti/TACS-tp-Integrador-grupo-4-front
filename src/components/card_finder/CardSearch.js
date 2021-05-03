import React from 'react'
import CardSearchBar from "./CardSearchBar";
import CardGrid from "../cards/CardGrid";



export default class CardSearch extends React.Component{
     constructor(props) {
         super(props);
         this.state ={search_query: "", hero_list: []}
         this.search_by_name = this.search_by_name.bind(this)

     }

    search_by_name(name){
         //aca llama al servicio y busca por nombre
        this.setState({hero_list: [{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/956.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"},{"name": "Batman", "power_stats" : [{"name": "combat", "value": 60}, {"name": "intelligence", "value": 38}, {"name": "strength", "value": 100}, {"name": "power", "value": 24}, {"name": "speed", "value": 17}, {"name": "height", "value": 10}, {"name": "weight", "value": 20}], "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"}]});
        return name
     }
    render() {
        return (
            <>
                <h1>Buscador de Heroes</h1>
                <CardSearchBar
                    onRequestSearch={this.search_by_name}
                />
                <CardGrid cards={this.state.hero_list}

                />
            </>
        );
    }
}
