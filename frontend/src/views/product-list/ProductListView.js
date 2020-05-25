import React from 'react';
import ProductService from "../../services/ProductService";
import {List, message} from 'antd';


export class ProductListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentWillMount() {
        this.getProducts();
    }

    async getProducts() {
        try {
            this.setState({
                products: await ProductService.getProducts()
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
