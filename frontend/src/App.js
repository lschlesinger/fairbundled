import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';

import './App.less';

import AuthService from "./services/AuthService";
import {LandingView} from "./views/landing/LandingView";
import {LoginView} from "./views/login/LoginView";
import {RegisterView} from "./views/register/RegisterView";
import ProductListView from "./views/product-list/ProductListView";
import {ProductDetailView} from "./views/product-detail/ProductDetailView";
import {ProductCreateView} from "./views/product-create/ProductCreateView";
import {AccountView} from "./views/account/AccountView";
import FairbundledHeader from "./components/FairbundledHeader";
import CategoryService from "./services/CategoryService";

const {Header, Footer, Content} = Layout;


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

            ],
            categories: []
        };

        this.getCategories();
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    async getCategories() {
        this.setState({
            categories: await CategoryService.getCategories()
        })
    }

    render() {
        return (
            <Layout>
                <Router>
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                        <FairbundledHeader categories={this.state.categories}/>
                    </Header>
                    <Content className="site-layout">

                        <Switch>
                            {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                        </Switch>

                    </Content>
                    <Footer style={{textAlign: 'center'}}>Footer</Footer>
                </Router>
            </Layout>
        );
    }
}
