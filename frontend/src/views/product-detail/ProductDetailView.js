import React from 'react';
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import ProductService from "../../services/ProductService";
import FairbundleService from "../../services/FairbundleService";
import {message} from "antd";
import ValidationError from "../../services/ValidationError";
import JoinFairbundleModalView from "./FairbundledJoinedModalView"
import CreateFairbundleModalView from "./FairbundleCreatedModalView"
import FairbundleSuccessView from './FairbundleSuccessView';

export class ProductDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            product: null,
            fairbundles: null,
            qty: 0,
            joinModalVisible: false,
            createModalVisible: false,
            successVisible: false,
            joinedFairbundle: null
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

    onShowCreateFairbundle = ({qty}) => {
        this.setState({qty: qty});
        this.showModal(false);
    };

    onShowJoinFairbundle = ({fairbundleId, qty}) => {
        this.setState({
            qty: qty,
            joinedFairbundle: this.state.fairbundles.find(f => f._id === fairbundleId)
        });

        this.showModal(true);
    };

    joinFairbundle() {
        FairbundleService.joinFairbundle(this.state.joinedFairbundle._id, this.state.qty)
            .then((fairbundle) => {
                this.getProductAndFairbundles();
                this.setState({successVisible: true});
            })
            .catch((err) => {
                if (err instanceof ValidationError) {
                    Object.entries(err.errors).map(e => {
                        this.getErrorNotification(e)
                    })
                }
            });
    }

    createFairbundle() {
        // TODO
    }

    onCreateOrder = (qty) => {
        this.setState({qty: qty});
        //TODO: open createOrderModal with state variables productId and quantity
        console.log("Create order", qty);
    };

    showModal = (join) => {
        this.setState({
            joinModalVisible: join,
            createModalVisible: !join
        });
    };

    hideModal = () => {
        this.setState({
            joinModalVisible: false,
            createModalVisible: false,
            successVisible: false
        });
    };

    render() {
        return (
            <div>
                <ProductDetails product={this.state.product}
                                fairbundles={this.state.fairbundles}
                                onCreateFairbundle={this.onShowCreateFairbundle}
                                onJoinFairbundle={this.onShowJoinFairbundle}
                                onCreateOrder={this.onCreateOrder}/>
                <JoinFairbundleModalView
                                fairbundle={this.state.joinedFairbundle}
                                joinFairbundle={this.joinFairbundle.bind(this)}
                                onClose={this.hideModal} 
                                modalVisible={this.state.joinModalVisible}/>
                <CreateFairbundleModalView
                                product={this.state.product}
                                createFairbundle={this.createFairbundle.bind(this)}
                                onClose={this.hideModal} 
                                modalVisible={this.state.createModalVisible}/>
                <FairbundleSuccessView
                                onClose={this.hideModal} 
                                modalVisible={this.state.successVisible}/>
            </div>
        );
    }
}
