import React from 'react';
import ReactDOM from 'react-dom';
import {CookiesProvider} from 'react-cookie';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import './index.css';
import App from './App';

var gscript = document.createElement('script');
gscript.type = 'text/javascript';
gscript.src = 'https://apis.google.com/js/platform.js';

var gmeta = document.createElement('meta');
gscript.name = 'google-signin-client_id';
gscript.content = '1058494963753-drauquf06tsu1jnbl7k13ptrp98s323d.apps.googleusercontent.com';

const appEl = document.getElementById('root');

const theme = createMuiTheme({
    palette: {
        primary: {
            // Orange and dark blue play nicely together.
            main: '#ffcc80',
        },
        secondary: {
            // This is dark blue.
            main: '#292479',
        },
    },
});

ReactDOM.render(
    <CookiesProvider>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </CookiesProvider>,
    appEl
);

document.head.appendChild(gscript);
document.head.appendChild(gmeta);
