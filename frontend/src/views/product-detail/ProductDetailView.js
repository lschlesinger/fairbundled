import React from 'react';
import ProductDetails from "../../components/ProductDetails/ProductDetails";

export class ProductDetailView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
           <ProductDetails/>
        );
    }
}
