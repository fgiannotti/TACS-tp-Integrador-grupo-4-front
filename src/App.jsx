import React from "react";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import {withCookies} from "react-cookie";
import CardSearch from "./components/card_finder/CardSearch";
import Home from './components/home/Home';
import Header from './components/home/Header';
import LoginScreen from "./components/login/LoginScreen";
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        let isAuthenticated = validateAuthentication()


        this.state = { isAuthenticated: isAuthenticated }
        this.history = createBrowserHistory();
    }

    handleSignIn = (isAuthenticated,isAuthorized,isAdmin) => {
        saveState({
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            isAdmin:isAdmin
        })
        this.setState({
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            isAdmin:isAdmin
        })
        return <Redirect to="/caca"/>
    }

    render() {

        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                        <Route exact path="/cards" component={(CardSearch)}/>
                        <Route exact path="/login"
                        render={() => {
                            return this.state.isAuthenticated ? <Redirect to="/" /> : <LoginScreen handleSignIn={this.handleSignIn}/>
                            }}/>
                        <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/" component={() => <Home isAdmin={this.state.isAdmin} />}/>
                        <Route isSignedIn={this.state.isAuthenticated} exact path="/test" render={() => <Header></Header>} />
                </BrowserRouter>
            </div>
        );
    }

}

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
  };

export default withCookies(App);
