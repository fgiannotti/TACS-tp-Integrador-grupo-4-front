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

class App extends React.Component {
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
        console.log("Handling Sign In....")
        const { cookies } = this.props;
        
        this.setState({
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            isAdmin: isAdmin,
        })

        if (isAuthenticated && isAuthorized) {
          cookies.set('GOOGLEID',userInfo.google_id)
          cookies.set('SESSIONID',userInfo.token_id)
          //mala practica, con el ID (algo que se valida constantemente) deberias obtener el nombre, pero **practicidad**
          cookies.set('USERNAME',userInfo.name)
          this.setState({homeRedirect: true})
        }else{
          this.setState({loginError:true})
        }
    }

    render() {

        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                  {this.state.homeRedirect ? <Redirect to="/"/> : <React.Fragment/>}
                  <Route exact path="/cards" component={(CardSearch)}/>
                  <Route exact path="/login" component={()=> <LoginScreen error={this.state.loginError} handleSignIn={this.handleSignIn}/>}/>
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/" component={() => <Home userName={this.props.cookies.get('USERNAME')} userId={this.props.cookies.get('GOOGLEID')} isAdmin={this.state.isAdmin} />}/>
                  <Route isSignedIn={this.state.isAuthenticated} exact path="/test" render={() => <DeckHome isAdmin={this.state.isAdmin} />} />
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/decks" component={ () => <DeckHome isAdmin={this.state.isAdmin} />} />
                  <ProtectedRoute  isSignedIn={this.state.isAuthenticated} exact path="/faq" component={ () => <Faq/>} />
                  <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/deck-builder" component={(DeckBuilder)}/>
                </BrowserRouter>
            </div>
        );
    }

}




/* LOCAL STORAGE AUTH
const validateAuthentication = () => {
  let isAuthenticatedFromOldState = false

  let state = loadState()
  if (state !== undefined && state.isAuthenticated !== undefined) {
      isAuthenticatedFromOldState = state.isAuthenticated
  }
  return isAuthenticatedFromOldState
}
const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
        //logciño
        console.log(e)
    }
  };

  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      console.log(e)
    }
  };*/

export default withCookies(App);
