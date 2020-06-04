import React from 'react';
import ProductCreateProcess from "../../components/ProductCreateProcess/ProductCreateProcess";
import CategoryService from "../../services/CategoryService";

export class ProductCreateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentWillMount() {
        this.getCategories();
    }

    async getCategories() {
        this.setState({
            categories: await CategoryService.getCategories()
        })
    }


    render() {
        return (
            <ProductCreateProcess categories={this.state.categories}/>
        );
    }
}
