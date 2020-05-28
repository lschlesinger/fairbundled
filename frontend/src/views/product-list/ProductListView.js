import React from 'react';
import ProductService from "../../services/ProductService";
import {List, message} from 'antd';

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
            <div>
                <p>Hello from ProductList</p>
                <List
                    size="small"
                    bordered
                    dataSource={this.state.products}
                    renderItem={product => <List.Item>{product.name}</List.Item>}
                />
            </div>
        );
    }
}
