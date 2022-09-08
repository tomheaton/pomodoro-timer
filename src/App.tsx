import React from 'react';
import logo from './images/logo.svg';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1>
                    Pomodoro Timer
                </h1>
                <p>
                    A simple Pomodoro timer.
                </p>
            </header>
        </div>
    );
}

export default App;
