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
import Lobby from "./components/play/Lobby";
import Game from "./components/game/Game";
import MyMatches from "./components/MyMatches";
import ManagementSocket from "./components/management_socket/ManagementSocket";
import StatisticsHome from "./components/statistics/StatisticsHome";
class App extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        super(props);
        const { cookies } = props;
        const session = cookies.get('SESSIONID')

        this.state = {isAuthenticated: session !== undefined, loginError: false, homeRedirect: false}
        this.history = createBrowserHistory();
    }


    handleSignIn = (userInfo,isAuthenticated,isAuthorized,isAdmin, jwt_data) => {
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
            cookies.set('JWT', jwt_data)
            this.setState({homeRedirect: true, loggedUser: userInfo.google_id})
            ManagementSocket.setUser(userInfo.google_id)
        } else {
            this.setState({loginError: true})
        }
    }

    render() {

        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                  {this.state.homeRedirect ? <Redirect to="/"/> : <React.Fragment/>}
                  <Route exact path="/cards" component={(StatisticsHome)}/>
                  <Route exact path="/login" component={()=> <LoginScreen error={this.state.loginError} handleSignIn={this.handleSignIn}/>}/>
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/"
                                  component={() => <Home userName={this.props.cookies.get('USERNAME')} userId={this.props.cookies.get('GOOGLEID')} isAdmin={this.state.isAdmin}/>}/>
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/decks" component={ () => <DeckHome isAdmin={this.state.isAdmin} />} />
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/faq" component={ () => <Faq/>} />
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/deck-builder" component={(DeckBuilder)}/>
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/lobby"
                                  component={() => <Lobby loggedUser={this.props.cookies.get('GOOGLEID')} loggedUserImage={this.props.cookies.get('USERIMAGE')} />} />
                    <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/game"
                                    component={() => <Game loggedUser={this.props.cookies.get('GOOGLEID')}/>} />
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/matches" component={() => <MyMatches loggedUser={this.props.cookies.get('GOOGLEID')} />} />
                </BrowserRouter>
            </div>
        );
    }
}

export default withCookies(App);
