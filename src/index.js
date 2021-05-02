import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Decks from './components/Decks';
import DecksCards from './components/DecksCards';
import { Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history'

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/login" component={"Soy un login"}/>
        <Route path="/"/>
        <Route path="/hello" component={App}/>
        <Route path="/decks" component={Decks}/>
        <Route path="/cards" component={DecksCards}/>
    </Router>,
        document.getElementById('root')
);

