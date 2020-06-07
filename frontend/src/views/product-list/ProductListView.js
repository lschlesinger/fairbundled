import React from 'react';
import ProductService from "../../services/ProductService";
import FairbundleService from "../../services/FairbundleService";
import {Layout, message} from 'antd';
import ProductListCard from "../../components/ProductListCard";
import './ProductListView.less';

// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;

export default class ProductListView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            products: [],
            fairbundles: []
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
            // get products
            let products = await ProductService.getProducts(search);
            // update products with flagged (hasFairbundle) products
            products = FairbundleService.getFairbundleFlags(products, fairbundles);
            //set state variables
            this.setState({
                fairbundles: fairbundles,
                products: products
            })
        } catch (e) {
            message.error("Error fetching products and fairbundles.");
        }
    }


    render() {
        return (
            <Layout className="product-list-view__layout">
                <Sider className="product-list-view__sider">
                    Sider
                </Sider>
                <Content className="product-list-view__content">
                    <ProductListCard fairbundles={this.state.fairbundles} products={this.state.products} />
                </Content>
            </Layout>

        );
    }
}
