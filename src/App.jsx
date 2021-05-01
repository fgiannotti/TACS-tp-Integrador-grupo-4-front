import './App.css';
import { Route, BrowserRouter } from "react-router-dom";
import LoginScreen from "./components/login/LoginScreen";
import React from "react";
import {createBrowserHistory} from "history";
import Home from './components/home/home'
import ProtectedRoute from './components/PrivateRoute';

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
                <BrowserRouter history={this.history}>
                        <Route exact path="/login" component={() => <LoginScreen handleSignIn={this.handleSignIn}/>}/>
                        <ProtectedRoute exact path="/" isSignedIn={this.state.isSignedIn} component={(Home)}/>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;