import './App.css';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import React from "react";
import {createBrowserHistory} from "history";
import Home from './components/home/Home'
import ProtectedRoute from './components/ProtectedRoute';
import {withCookies} from "react-cookie";

class App extends React.Component {
    constructor(props) {
        super(props);

        var isAuthenticatedFromOldState = false

        let state = loadState()
        if (state !== undefined && state.isAuthenticated !== undefined) {
            isAuthenticatedFromOldState = state.isAuthenticated
        }
        
        this.state = { isAuthenticated: isAuthenticatedFromOldState }
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
                        <Route exact path="/login"
                        render={() => {
                            return this.state.isAuthenticated ? <Redirect to="/" /> : <LoginScreen handleSignIn={this.handleSignIn}/>
                            }}/>
                        <ProtectedRoute isSignedIn={this.state.isAuthenticated} exact path="/" component={(Home)}/>
                </BrowserRouter>
            </div>
        );
    }

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
