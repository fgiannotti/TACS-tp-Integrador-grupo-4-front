import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Cards from './components/cards/Card';
import { Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history'

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/login" component={"Soy un login"}/>
        <Route path="/"/>
        <Route path="/cards" component={Cards}/>
    </Router>,
        document.getElementById('root')
);

