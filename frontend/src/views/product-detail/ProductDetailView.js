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
            product: null,
            fairbundles: null,
            qty: 0
        };
        console.log(this.props);
    }

    componentDidMount() {
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
        this.setState({qty: qty});
        //TODO: open createFairbundleModal with state variables productId and quantity
        console.log("Create fairbundle", qty);
    };

    onJoinFairbundle = ({fairbundleId, qty}) => {
        this.setState({qty: qty});
        //TODO: open joinFairbundleModal with fairbundleId and state variables productId and quantity
        console.log("Join fairbundle", qty);
    };

    onCreateOrder = (qty) => {
        this.setState({qty: qty});
        //TODO: open createOrderModal with state variables productId and quantity
        console.log("Create order", qty);
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
