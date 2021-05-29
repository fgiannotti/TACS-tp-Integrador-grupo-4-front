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
import GameCard from "./components/game/GameCard";
import Avatar from "@material-ui/core/Avatar";

class App extends React.Component {
    carta = {"name": "A-Bomb", "id": 1, "power_stats": [{
            "name": "combat",
            "value": 64
        },
            {
                "name": "intelligence",
                "value": 38
            },
            {
                "name": "strength", "value": 100
            },
            {
                "name": "power",
                "value": 24
            },
            {
                "name": "durability",
                "value": 80
            },
            {
                "name": "speed",
                "value": 17
            },
            {
                "name": "height",
                "value": 203
            },
            {
                "name": "weight",
                "value": 441
            }
        ],
        "image_url": "https://www.superherodb.com/pictures2/portraits/10/100/10060.jpg"};
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props) {
        console.log("App constructor...")
        super(props);
        const { cookies } = props;
        const session = cookies.get('SESSIONID')

        this.state = {isAuthenticated: session !== undefined, loginError: false, homeRedirect: false}
        this.history = createBrowserHistory();
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

            this.setState({homeRedirect: true, loggedUser: userInfo.google_id})
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
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/" component={() => <Home userName={this.props.cookies.get('USERNAME')} userId={this.props.cookies.get('GOOGLEID')} isAdmin={this.state.isAdmin}/>}/>
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/decks" component={ () => <DeckHome isAdmin={this.state.isAdmin} />} />
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/faq" component={ () => <Faq/>} />
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/deck-builder" component={(DeckBuilder)}/>
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/lobby" component={() => <Lobby loggedUser={this.props.cookies.get('GOOGLEID')} loggedUserImage={this.props.cookies.get('USERIMAGE')} />} />
                    <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/game/board" component={() => <Game mainUser="username1" data={{"turno":"username1","usuarios":[{"username":"username1","image":"https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png", "cartaActual":this.carta,"carta":1,"ganadas":10}, {"username":"username2", "image":"https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png", "cartaActual":this.carta,"carta":10,"ganadas":11}]}}/> }/>
                    <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/game/results" component={() => <Game mainUser={"USERNAME"} opponentUser = {"USERNAME_USER_OPPENENT"} deckID={"ID_DECK"}/>} />
                    <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/game/card" component={() => <GameCard card = {this.carta}/>} />

                </BrowserRouter>
            </div>
        );
    }

}

export default withCookies(App);
