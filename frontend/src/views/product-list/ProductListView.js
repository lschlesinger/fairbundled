import React from 'react';
import ProductService from "../../services/ProductService";
import {Layout, message} from 'antd';
import ProductListCard from "../../components/ProductListCard";
import './ProductListView.less';

// decide on overall layout structure (ANT)
const {Sider, Content} = Layout;

export default class ProductListView extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentWillMount() {
        this.getProducts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.getProducts();
        }
    }


    async getProducts() {
        try {
            const {location: {search}} = this.props;
            this.setState({
                products: await ProductService.getProducts(search)
            });
        } catch (e) {
            message.error("Error fetching products.");
        }
    }

    render() {
        return (
            <Layout className="product-list-view__layout">
                <Sider className="product-list-view__sider">
                    Sider
                </Sider>
                <Content className="product-list-view__content">
                    <ProductListCard products={this.state.products}/>
                </Content>
            </Layout>

        );
    }
}
