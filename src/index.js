import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'

var gscript = document.createElement('script');
gscript.type = 'text/javascript';
gscript.src ='https://apis.google.com/js/platform.js';

var gmeta = document.createElement('meta');
gscript.name = 'google-signin-client_id';
gscript.content ='1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com';



ReactDOM.render(
    <Router history={createBrowserHistory()}>
        <Route path="/login" component={App}/>
        <Route exact path="/" component={App}/>
        <Route exact path="/hello" component={App}/>
    </Router>,
        document.getElementById('root'),
);

document.head.appendChild(gscript);
document.head.appendChild(gmeta);



/*<Redirect from="/" to="/login" />*/
