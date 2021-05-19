import React from "react";
import { instanceOf } from 'prop-types';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import { withCookies, Cookies } from "react-cookie";
import CardSearch from "./components/card_finder/CardSearch";
import Home from './components/home/Home';
import LoginScreen from "./components/login/LoginScreen";
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import DeckHome from "./components/decks/DeckHome";
import DeckBuilder from "./components/deck_builder/DeckBuilder";
import Faq from "./components/faq/Faq";
import SocketConnection from "./socketEvents";
import Lobby from "./components/play/Lobby";

class App extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        console.log("App constructor...")
        super(props);
        const { cookies } = props;
        const session = cookies.get('SESSIONID')

        this.state = {isAuthenticated: session !== undefined, loginError: false, homeRedirect: false, connectedUsers: []}
        this.history = createBrowserHistory();
    }

    connectToBackendWithSockets = (userInfo) => {
        let socket = new WebSocket("ws://localhost:9000/home?userId=" + userInfo.google_id);
        socket.onopen = () => {
            console.log("connected to server")
        }

        socket.onmessage = (event) => {
            let connectedUsers = []
            try {
                connectedUsers = JSON.parse(event.data)
                connectedUsers = connectedUsers.map(userString => JSON.parse(userString))
            }catch(err) {
                console.log(err)
            }
            this.setState({connectedUsers: connectedUsers})
        }

        socket.onclose = () => {
            alert("You've been disconnected from server")
        }
    }

    handleSignIn = (userInfo,isAuthenticated,isAuthorized,isAdmin) => {
        const { cookies } = this.props;
        
        this.setState({
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            isAdmin: isAdmin,
        })

        if (isAuthenticated && isAuthorized) {
            cookies.set('GOOGLEID', userInfo.google_id)
            cookies.set('SESSIONID', userInfo.token_id)
            cookies.set('USERNAME', userInfo.name)
            cookies.set('USERIMAGE', userInfo.image_url)

            this.connectToBackendWithSockets(userInfo)

            this.setState({homeRedirect: true})
        } else {
            this.setState({loginError: true})
        }
    }

    render() {

        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                  {this.state.homeRedirect ? <Redirect to="/"/> : <React.Fragment/>}
                  <Route exact path="/cards" component={(CardSearch)}/>
                  <Route exact path="/login" component={()=> <LoginScreen error={this.state.loginError} handleSignIn={this.handleSignIn}/>}/>
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/" component={() => <Home userName={this.props.cookies.get('USERNAME')} userId={this.props.cookies.get('GOOGLEID')} isAdmin={this.state.isAdmin} connectedUsers={this.state.connectedUsers}/>}/>
                  <Route isSignedIn={this.state.isAuthenticated} exact path="/test" render={() => <DeckHome isAdmin={this.state.isAdmin} />} />
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/decks" component={ () => <DeckHome isAdmin={this.state.isAdmin} />} />
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/faq" component={ () => <Faq/>} />
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/deck-builder" component={(DeckBuilder)}/>
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/lobby" component={() => <Lobby loggedUser={this.props.cookies.get('GOOGLEID')} loggedUserImage={this.props.cookies.get('USERIMAGE')} />} />
                </BrowserRouter>
            </div>
        );
    }

}

export default withCookies(App);
