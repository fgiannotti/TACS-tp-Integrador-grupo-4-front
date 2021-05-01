import './App.css';
import { BrowserRouter, Redirect, Route, Router } from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import React from "react";
import {createBrowserHistory} from "history";
import Home from './components/home/home'
import ProtectedRoute from './components/ProtectedRoute';

class App extends React.Component {
    constructor(props) {
        super(props);

        var isAuthenticatedFromOldState = false

        let state = loadState()
        if (state !== undefined && state.isSignedIn !== undefined) {
            isAuthenticatedFromOldState = state.isSignedIn
        }

        this.state = { isAuthenticated: isAuthenticatedFromOldState }
        this.history = createBrowserHistory();
    }

    handleSignIn = (isAuthenticated,isAuthorized,isAdmin) => {
        this.setState({
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            isAdmin:isAdmin
        })
        saveState(this.state)
        return <Redirect to="/caca"/>
    }

    render() {
        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                        <Route exact path="/login" isSignedIn={this.state.isSignedIn} 
                        render={() => {
                            return this.state.isSignedIn ? <Redirect to="/" /> : <LoginScreen handleSignIn={this.handleSignIn}/>
                            }}/>
                        <ProtectedRoute exact path="/" isSignedIn={this.state.isSignedIn} component={(Home)}/>
                        <ProtectedRoute exact path="/caca" isSignedIn={this.state.isSignedIn} component={() => <Home {...this.state}/> }/>
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

export default App;