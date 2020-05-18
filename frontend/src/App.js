import React from 'react';
import logo from "./logo.jpg";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

import './App.css';

function App() {
    return (
        <Router>
            <div className="container">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
                        <img src={logo} width="30" height="30" alt=""/>
                    </a>
                    <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
                    <div className="collpase nav-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Todos</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/create" className="nav-link">Create Todo</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Route path="/register" exact component={Register}/>
            </div>
        </Router>
    );
}

export default App;
