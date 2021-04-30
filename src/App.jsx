import './App.css';
import {Route, Router} from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import React from "react";
import {createBrowserHistory} from "history";
import Home from './components/home/home'
import PrivateRoute from './components/PrivateRoute'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isSignedIn: false }
        this.history = createBrowserHistory();
    }

    handleSignIn = () => {
        this.setState({
            isSignedIn: true
        })
    }

    render() {
        return (
            <div className="App full-screen">
                <Router history={this.history}>
                    <Route path="/login"
                           component={() => <LoginScreen handleSignIn={this.handleSignIn}/>}/>
                    <PrivateRoute isSignedIn={this.state.isSignedIn} path="/home" component={(Home)}/>
                </Router>
            </div>
        );
    }

}

export default App;
