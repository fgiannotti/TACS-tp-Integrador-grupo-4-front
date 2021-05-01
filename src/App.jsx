import './App.css';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import React from "react";
import {createBrowserHistory} from "history";
import Home from './components/home/home'
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLoginRoute from './components/login/ProtectedLoginRoute';

class App extends React.Component {
    constructor(props) {
        super(props);

        var isSignedInFromOldState = false

        let state = loadState()
        if (state !== undefined && state.isSignedIn !== undefined) {
            isSignedInFromOldState = state.isSignedIn
        }

        this.state = { isSignedIn: isSignedInFromOldState }
        this.history = createBrowserHistory();
    }

    handleSignIn = () => {
        this.setState({
            isSignedIn: true
        })
        saveState(this.state)
        return <Redirect to="/caca"/>
    }

    render() {
        return (
            <div className="App full-screen">
                <BrowserRouter history={this.history}>
                        <ProtectedLoginRoute exact path="/login" isSignedIn={this.state.isSignedIn} component={() => <LoginScreen handleSignIn={this.handleSignIn}/>}/>
                        <ProtectedRoute exact path="/" isSignedIn={this.state.isSignedIn} component={(Home)}/>
                        <Route exact path="/caca" isSignedIn={this.state.isSignedIn} component={(Home)}/>
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