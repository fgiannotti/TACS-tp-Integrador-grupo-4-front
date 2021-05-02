import './DecksCards.scss';
import React from 'react';
import {MDCRipple} from '@material/ripple';

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

class Attribute extends React.Component{
    render(){
    return (<li>
    {this.prop.value['name']}
    </li>);}
}
function DecksCards() {
    return Card_test({"name": "hola", "image": "https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg", "attributes": [{"name": "h"}, {"name": "h"}]});
}

function Card_test (card){
    var attr = card["attributes"]
    var itemsToRender;
    if (attr) {
        itemsToRender = attr.map(item => {
            return (<div class="mdc-card__media-content">item</div>);
        });
    } else {
    itemsToRender = "Loading...";
}
    return (
        <div className="DecksCars">
            <header className="Decks-header">
                <div class="my-card__media">
                    <div class="mdc-card__media-content">{card["name"]}</div>
                    <img class="mdc-image-list__image" src={card["image"]} height ="250" width = "200"/>
                    <div class="mdc-card__media-content">{itemsToRender}</div>
                </div>
            </header>
        </div>
    );
}


export default DecksCards;