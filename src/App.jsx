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
import {decodeToken, isExpired} from "react-jwt";
class App extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = {loginError: false, homeRedirect: false}
        this.history = createBrowserHistory();
    }


    handleSignIn = (userInfo, jwt_data) => {
        const { cookies } = this.props;
        console.log(this.props.cookies.get('JWT'))
        if ((this.props.cookies.get('JWT') == null || !isExpired(jwt_data)) && decodeToken(jwt_data)["isAuthenticated"] && decodeToken(jwt_data)["isAuthorized"]) {
            cookies.set('GOOGLEID', userInfo.google_id)
            cookies.set('SESSIONID', userInfo.token_id)
            cookies.set('USERNAME', userInfo.name)
            cookies.set('USERIMAGE', userInfo.image_url)
            cookies.set('JWT', jwt_data)
            this.setState({LoggedUser: userInfo.google_id, homeRedirect: true})
            ManagementSocket.setUser(userInfo.google_id)
        } else {
            this.setState({loginError: true})
        }
    }
    redirectHome(){
        if(this.state.homeRedirect){
            this.setState({ homeRedirect: false})
            return true
        }else{
            return false
        }
    }
    validateLogin(){
        if (this.props.cookies.get('JWT') ===undefined){
            return false
        }else{
            return !isExpired(this.props.cookies.get('JWT'))
        }
    }

    render() {

        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                  {this.redirectHome() ? <Redirect to="/"/> : <React.Fragment/>}
                  <Route exact path="/cards" component={(StatisticsHome)}/>
                  <Route exact path="/login" component={()=> <LoginScreen error={this.state.loginError} handleSignIn={this.handleSignIn}/>}/>
                  <ProtectedRoute isSignedIn={this.validateLogin()} exact path="/"
                                  component={() => <Home userName={this.props.cookies.get('USERNAME')} userId={this.props.cookies.get('GOOGLEID')} isAdmin={decodeToken(this.props.cookies.get('JWT'))["isAdmin"]}/>}/>
                  <ProtectedRoute  isSignedIn={this.validateLogin()} exact path="/decks" component={ () => <DeckHome isAdmin={ decodeToken(this.props.cookies.get('JWT'))["isAdmin"]} />} />
                  <ProtectedRoute  isSignedIn={this.validateLogin()} exact path="/faq" component={ () => <Faq/>} />
                  <ProtectedRoute isSignedIn={this.validateLogin()} exact path="/deck-builder" component={(DeckBuilder)}/>
                  <ProtectedRoute isSignedIn={this.validateLogin()} exact path="/lobby"
                                  component={() => <Lobby loggedUser={this.props.cookies.get('GOOGLEID')} loggedUserImage={this.props.cookies.get('USERIMAGE')} />} />
                    <ProtectedRoute isSignedIn={this.validateLogin()} exact path="/game"
                                    component={() => <Game loggedUser={this.props.cookies.get('GOOGLEID')}/>} />
                  <ProtectedRoute isSignedIn={this.validateLogin()} exact path="/matches" component={() => <MyMatches loggedUser={this.props.cookies.get('GOOGLEID')} />} />
                </BrowserRouter>
            </div>
        );
    }
}

export default withCookies(App);
