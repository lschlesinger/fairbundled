import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";
import {ConfigProvider, Layout} from "antd";
import deDE from "antd/es/locale/de_DE";
// override style
import "./App.less";
// import all components and views
import AuthService from "./services/AuthService";
import {LandingView} from "./views/landing/LandingView";
import LoginView from "./views/login/LoginView";
import RegisterView from "./views/register/RegisterView";
import ProductListView from "./views/product-list/ProductListView";
import {ProductDetailView} from "./views/product-detail/ProductDetailView";
import ProductCreateView from "./views/product-create/ProductCreateView";
import {AccountView} from "./views/account/AccountView";
import FairbundledHeader from "./components/FairbundledHeader/FairbundledHeader";
import CategoryService from "./services/CategoryService";
import FairbundledFooter from "./components/FairbundledFooter/FairbundledFooter";
import FairbundleService from "./services/FairbundleService";
import OrderService from "./services/OrderService";
import UserEditView from "./views/account/UserEditView";
import CheckoutView from "./views/account/municipality-account/CheckoutView";
import {Spinner} from "./components/Functional/Spinner";
import ScrollToTop from "./components/Functional/ScrollToTop";

// decide on overall layout structure (ANT)
const {Header, Footer, Content} = Layout;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Fairbundled",
            // connect routes (url) and components
            routes: [
                {component: LandingView, path: "/", exact: true},
                {
                    // allow rendering of certain views only for authenticated user
                    render: (props) => {
                        if (AuthService.isAuthenticated()) {
                            return <ProductCreateView {...props} />;
                        } else {
                            return <Redirect to={"/login"}/>;
                        }
                    },
                    path: "/product/create",
                },
                {
                    render: (props) => {
                        return (
                            <ProductDetailView
                                onUpdate={this.update}
                                {...props}
                            />
                        );
                    },
                    path: "/product/:id",
                },
                {component: ProductListView, path: "/product"},
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
                {
                    // allow rendering of certain views only for authenticated user
                    render: (props) => {
                        if (AuthService.isAuthenticated() && AuthService.isAuthenticatedMunicipality()) {
                            return <CheckoutView
                                onUpdate={this.update}
                                {...props}/>;
                        } else {
                            return <Redirect to={"/checkout"}/>;
                        }
                    },
                    path: "/checkout",
                },
                {
                    render: (props) => {
                        // allow rendering of certain views only for authenticated user
                        if (AuthService.isAuthenticated()) {
                            return <UserEditView {...props} />;
                        } else {
                            return <Redirect to={"/login"}/>;
                        }
                    },
                    path: "/user/edit",
                }
            ],
            categories: [],
            openFairbundles: 0,
            positionsInCart: 0,
        };
        // fetch categories in background to further pass them to child components
        this.getCategories();
        this.getOpenFairbundlesAndPositions();
    }

    update = () => {
        this.getOpenFairbundlesAndPositions();
    };

    componentDidMount() {
        document.title = this.state.title;
    }

    async getCategories() {
        this.setState({
            categories: await CategoryService.getCategories(),
        });
    }

    async getOpenFairbundlesAndPositions() {
        let fairbundles = await this.getOpenFairbundles();
        let positions = await this.getPositions();

        this.setState({
            openFairbundles: fairbundles,
            positionsInCart: positions,
        });
    }

    async getOpenFairbundles() {
        if (!AuthService.isAuthenticatedMunicipality()) {
            return 0;
        }

        let fairbundles = await FairbundleService.getFairbundles();

        let currentMunicipality = AuthService.getCurrentUser().municipality._id;

        fairbundles = fairbundles.filter(
            (f) => f.municipality === currentMunicipality || f.bundlers.includes(currentMunicipality)
        );
        fairbundles = fairbundles.filter(
            (f) => f.submission === null && f.cancellation === null
        );

        return fairbundles.length;
    }

    async getPositions() {
        if (!AuthService.isAuthenticatedMunicipality()) {
            return 0;
        }

        let orders = await OrderService.getOrders();
        orders = orders.filter(
            (f) => f.submission === null && f.cancellation === null
        );

        let unique = orders
            .flatMap((o) => o.positions)
            .map((p) => p.product)
            .filter(this.onlyUnique);

        return unique.length;
    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    renderContent() {
        return (
            <Router>
                <ScrollToTop>
                    <Header className="app__header">
                        <FairbundledHeader
                            openFairbundles={this.state.openFairbundles}
                            positions={this.state.positionsInCart}
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
                                <Route key={i} {...route}/>
                            ))}
                        </Switch>
                    </Content>
                    <Footer className="app__footer">
                        <FairbundledFooter/>
                    </Footer>
                </ScrollToTop>
            </Router>
        );
    }

    render() {
        const categories = this.state.categories;
        let contentComponent = <Spinner/>;
        if (categories && categories.length > 0) {
            contentComponent = this.renderContent();
        }
        return (
            <Layout>
                <ConfigProvider locale={deDE}>
                    {contentComponent}
                </ConfigProvider>
            </Layout>
        );
    }
}
