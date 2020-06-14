import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {Layout, Row, Spin} from "antd";
// override style
import "./App.less";
// import all components and views
import AuthService from "./services/AuthService";
import {LandingView} from "./views/landing/LandingView";
import LoginView from "./views/login/LoginView";
import RegisterView from "./views/register/RegisterView";
import ProductListView from "./views/product-list/ProductListView";
import {ProductDetailView} from "./views/product-detail/ProductDetailView";
import {ProductCreateView} from "./views/product-create/ProductCreateView";
import {AccountView} from "./views/account/AccountView";
import FairbundledHeader from "./components/FairbundledHeader/FairbundledHeader";
import CategoryService from "./services/CategoryService";
import FairbunbledFooter from "./components/FairbundledFooter/FairbunbledFooter";
import {LoadingOutlined} from '@ant-design/icons';

// decide on overall layout structure (ANT)
const {Header, Footer, Content} = Layout;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Fairbundled",
            // connect routes (url) and components
            routes: [
                {component: LandingView, path: '/', exact: true},
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
                {component: ProductDetailView, path: '/product/:id'},
                {component: ProductListView, path: '/product'},
                {
                    // allow rendering of certain views only for non-authenticated user
                    render: (props) => {
                        if (!AuthService.isAuthenticated()) {
                            return <LoginView/>;
                        } else {
                            return <Redirect to={"/"}/>;
                        }
                    },
                    path: "/login",
                },
                {
                    // allow rendering of certain views only for non-authenticated user
                    render: (props) => {
                        if (!AuthService.isAuthenticated()) {
                            return <RegisterView/>;
                        } else {
                            return <Redirect to={"/"}/>;
                        }
                    },
                    path: "/register",
                },
                {
                    // allow rendering of certain views only for authenticated user
                    render: (props) => {
                        if (AuthService.isAuthenticated()) {
                            return <AccountView {...props} />;
                        } else {
                            return <Redirect to={"/login"}/>;
                        }
                    },
                    path: "/account",
                },
            ],
            categories: [],
        };
        // fetch categories in background to further pass them to child components
        this.getCategories();
    }

    componentDidMount() {
        document.title = this.state.title;
    }

    async getCategories() {
        this.setState({
            categories: await CategoryService.getCategories(),
        });
    }

    renderContent() {
        return <Router>
            <Header className="app__header">
                <FairbundledHeader
                    categories={this.state.categories}
                    isAuthenticated={AuthService.isAuthenticated()}
                    isMunicipality={AuthService.isAuthenticatedMunicipality()}
                    entityName={AuthService.getEntityName()}
                    isSupplier={AuthService.isAuthenticatedSupplier()}
                    onLogout={AuthService.logout}
                />
            </Header>
            <Content className="app__content">
                {/*dynamically load `Content` through router*/}
                <Switch>
                    {this.state.routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                </Switch>
            </Content>
            <Footer className="app__footer">
                <FairbunbledFooter/>
            </Footer>
        </Router>
    }

    renderSpinner() {
        const antIcon = <LoadingOutlined style={{fontSize: 36}} spin/>;

        return (
            <Row justify="center"
                 align="middle"
                 className="app__spinner-container">
                <Spin
                    size="large"
                    indicator={antIcon}/>
            </Row>
        )
    }

    render() {
        return (
            <Layout>
                {
                    this.state.categories && this.state.categories.length > 0 ? this.renderContent() :
                        this.renderSpinner()
                }
            </Layout>
        );
    }
}
