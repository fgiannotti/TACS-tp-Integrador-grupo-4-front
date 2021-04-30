import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React from 'react';

var gscript = document.createElement('script');
gscript.type = 'text/javascript';
gscript.src = 'https://apis.google.com/js/platform.js';

var gmeta = document.createElement('meta');
gscript.name = 'google-signin-client_id';
gscript.content = '1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com';


ReactDOM.render(<App/>, document.getElementById('root'));

document.head.appendChild(gscript);
document.head.appendChild(gmeta);


/*<Redirect from="/" to="/login" />*/
