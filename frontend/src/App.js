import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Layout} from 'antd';

// override style
import './App.less';

// import all components and views
import AuthService from "./services/AuthService";
import {LandingView} from "./views/landing/LandingView";
import {LoginView} from "./views/login/LoginView";
import {RegisterView} from "./views/register/RegisterView";
import ProductListView from "./views/product-list/ProductListView";
import {ProductDetailView} from "./views/product-detail/ProductDetailView";
import {ProductCreateView} from "./views/product-create/ProductCreateView";
import {AccountView} from "./views/account/AccountView";
import FairbundledHeader from "./components/FairbundledHeader/FairbundledHeader";
import CategoryService from "./services/CategoryService";
import FairbunbledFooter from "./components/FairbundledFooter/FairbunbledFooter";

// decide on overall layout structure (ANT)
const {Header, Footer, Content} = Layout;


export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Fairbundled',
            // connect routes (url) and components
            routes: [
                {component: LandingView, path: '/', exact: true},
                {component: LoginView, path: '/login'},
                {component: RegisterView, path: '/register'},
                {component: ProductListView, path: '/product'},
                {component: ProductDetailView, path: '/product/:id'},
                {
                    // allow rendering of certain views only for authenticated user
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
        // fetch categories in background to further pass them to child components
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
                    <Header className="app__header">
                        <FairbundledHeader categories={this.state.categories}/>
                    </Header>
                    <Content className="app__content">
                        {/*dynamically load `Content` through router*/}
                        <Switch>
                            {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                        </Switch>
                    </Content>
                    <Footer>
                        <FairbunbledFooter/>
                    </Footer>
                </Router>
            </Layout>
        );
    }
}
