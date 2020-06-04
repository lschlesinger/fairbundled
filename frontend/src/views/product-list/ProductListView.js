import React from 'react';
import ProductService from "../../services/ProductService";
import {message, Layout} from 'antd';
import ProductListCard from "../../components/ProductListCard";
import ProductFilterBar from "../../components/ProductFilterBar/ProductFilterBar"
import './ProductListView.less';

const {Content, Sider } = Layout;

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
            <Layout className="layout">
                <Sider className="sider" width="30%"><ProductFilterBar/></Sider>
                <Content><ProductListCard products={this.state.products}/></Content>
            </Layout>
        );
    }
}
