import './App.css';
import LoginScreen from './components/login/LoginScreen';
import background from "./superfriends.jpg";

function App() {
    return (
        <div className="App full-screen"
             style={{
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat',
                 backgroundImage: `url(${background})`
             }}>
            <LoginScreen/>
        </div>
    );
}

export default App;
