import React from 'react';
import ProductListCard from "../../components/ProductListCard";
import ProductService from "../../services/ProductService";
import {Layout, message} from "antd";
import FairbundleService from "../../services/FairbundleService";

// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;

export class LandingView extends React.Component {

constructor(props) {
    super(props);
    this.state = {
        product: [],
    };
}


componentWillMount() {
    this.getProductsAndFairbundles();
}

componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
        this.getProductsAndFairbundles();
    }
}

async getProductsAndFairbundles() {
    try {
        const {location: {search}} = this.props;
        // get fairbundles
        let fairbundles =  await FairbundleService.getFairbundles();
        // get recommended product
        let product = await ProductService.getProducts('5ed537556ea8f1fcd3e8ff9e');
        //set state variables
        this.setState({
            fairbundles: fairbundles,
            product: product
        })
    } catch (e) {
        message.error("Error fetching products and fairbundles.");
    }
}


render() {
    return (
        <Layout className="landing-view__layout">
            <Sider className="landing-view__sider">
                Sider
            </Sider>
            <Content className="landing-view__content">
                <ProductListCard fairbundles={this.state.fairbundles} products={this.state.product} />
            </Content>
        </Layout>

    );
}
}

/*
render() {
    return (
        <p>Hello from Landing /n test</p>
    );
}
}
 */
