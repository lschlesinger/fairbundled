import React from 'react';
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductService from "../../services/ProductService";
import FairbundleService from "../../services/FairbundleService";
import {message} from "antd";


export class ProductDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            product: {},
            fairbundles: []
        };
        console.log(this.props);
    }

    componentWillMount() {
        this.getProductAndFairbundles();
    }

    async getProductAndFairbundles() {
        try {
            const product = await ProductService.getProduct(this.state.productId);
            const fairbundles = await FairbundleService.getFairbundlesByProductId(this.state.productId);
            this.setState({
                product: product,
                fairbundles: fairbundles
            })
        } catch (e) {
            message.error("Error fetching Product and associated Fairbundles.")
        }
    }

    onCreateFairbundle = ({qty}) => {
        console.log("Create fairbundle", qty);
    };

    onJoinFairbundle = ({fairbundleId, qty}) => {
        console.log("Join fairbundle", fairbundleId, qty);
    };

    onCreateOrder = (orderQty) => {
        console.log("Create order", orderQty);
    };

    render() {
        return (
            <ProductDetails product={this.state.product}
                            fairbundles={this.state.fairbundles}
                            onCreateFairbundle={this.onCreateFairbundle}
                            onJoinFairbundle={this.onJoinFairbundle}
                            onCreateOrder={this.onCreateOrder}/>
        );
    }
}
