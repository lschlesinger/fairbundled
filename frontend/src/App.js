import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";

import 'antd/dist/antd.css';

import AuthService from "./services/AuthService";
import {LandingView} from "./views/landing/LandingView";
import {LoginView} from "./views/login/LoginView";
import {RegisterView} from "./views/register/RegisterView";
import {ProductListView} from "./views/product-list/ProductListView";
import {ProductDetailView} from "./views/product-detail/ProductDetailView";
import {ProductCreateView} from "./views/product-create/ProductCreateView";
import {AccountView} from "./views/account/AccountView";
import Header from "./components/Header";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Fairbundled',
            routes: [
                {component: LandingView, path: '/', exact: true},
                {component: LoginView, path: '/login'},
                {component: RegisterView, path: '/register'},
                {component: ProductListView, path: '/product'},
                {component: ProductDetailView, path: '/product/:id'},
                {
                    render: (props) => {
                        if (AuthService.isAuthenticated()) {
                            return (<ProductCreateView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/product/create'
                },
                {
                    render: (props) => {
                        if (AuthService.isAuthenticated()) {
                            return (<AccountView {...props} />)
                        } else {
                            return (<Redirect to={'/login'}/>)
                        }
                    }, path: '/account',
                },

            ]
        };
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    render() {
        return (
            <div>
                <Header/>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                    </Switch>
                </Router>
            </div>
        );
    }

}
