import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'antd/dist/antd.css';
import TodosList from "./todos-list.component";
import EditTodo from "./edit-todo";
import CreateTodo from "./create-todo";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <h2>MERN-Stack Todo App</h2>
                </div>
                <Route path="/" exact component={TodosList}/>
                <Route path="/edit/:id" component={EditTodo}/>
                <Route path="/create" component={CreateTodo}/>
            </Router>
        );
    }
}

export default App;
