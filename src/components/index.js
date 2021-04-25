import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history'

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Redirect from="/" to="/login" />
        <Route path="login" component={"Soy un login"}/>
        <Route path="/"/>
        <Route path="hello" component={App}/>
    </Router>,
        document.getElementById('root')
);

