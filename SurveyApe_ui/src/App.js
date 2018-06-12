import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import WelcomePage from "./Components/Welcome";


class App extends Component {
    render()
    {
        return(
            <div className="App">
                <BrowserRouter>
                    <WelcomePage/>
                </BrowserRouter>
            </div>
        );
    }
}
export default App;
