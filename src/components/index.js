import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history'

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/hello">
                <App />
        </Route>
    </Router>,
        document.getElementById('root')
);

