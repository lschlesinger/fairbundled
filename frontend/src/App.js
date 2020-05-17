import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import UserRegistration from "./components/user-registration";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <h2>FAIRBUNDLED Todo App</h2>
                </div>
                <Route path="/register" exact component={UserRegistration}/>
            </Router>
        );
    }
}

export default App;
