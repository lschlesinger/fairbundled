import React from "react";
import ProductService from "../../services/ProductService";
import FairbundleService from "../../services/FairbundleService";
import {Layout, message} from 'antd';
import ProductListCard from "../../components/ProductListCard/ProductListCard";
import ProductFilterBar from "../../components/ProductFilterBar/ProductFilterBar"
import './ProductListView.less';

// decide on overall layout structure (ANT)
const { Sider, Content } = Layout;

export default class ProductListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            fairbundles: null,
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

    onSelectedCertsChanged(selectedCerts) {
        this.getProductsAndFairbundles(selectedCerts);
    }

    async getProductsAndFairbundles(certificates = null) {
        try {
            const {
                location: { search },
            } = this.props;
            // get fairbundles
            let fairbundles = await FairbundleService.getFairbundles();
            // get products
            let products = await ProductService.getProducts(search);
            if (certificates != null && certificates.length > 0) {
                products = products.filter(p => p.certificates.some(r=> certificates.indexOf(r) >= 0));
            }
            // update products with smallest Price Information
            products = ProductService.getSmallestPrice(products);
            // update products with flagged (hasFairbundle) products
            products = FairbundleService.getFairbundleFlags(
                products,
                fairbundles
            );
            //set state variables
            this.setState({
                fairbundles: fairbundles,
                products: products,
            });
        } catch (e) {
            message.error("Error fetching products and fairbundles.");
        }
    }

    render() {
        return (
            <Layout className="product-list-view__layout">
                <Sider width="30%" className="product-list-view__sider" style={{
                    overflow: 'auto',
                    position: 'relative',
                    left: 0}}>
                    <ProductFilterBar onSelectedCertsChanged={this.onSelectedCertsChanged.bind(this)} />
                </Sider>
                <Content className="product-list-view__content">
                    {this.state.products && this.state.fairbundles ? (
                        <ProductListCard
                            fairbundles={this.state.fairbundles}
                            products={this.state.products}
                        />
                    ) : (
                        ""
                    )}
                </Content>
            </Layout>
        );
    }
}
