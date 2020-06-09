import React from 'react';
import {Modal} from 'antd';
import ProductDetails from "../../components/ProductDetails/ProductDetails";

export default class ProductPreviewModalView extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true
        }

    }

    render() {
        return (
            <Modal
                title="Vorschau"
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
                width="1160"
            >
                <ProductDetails product={this.state.product}
                                fairbundles={this.state.fairbundles}
                                onCreateFairbundle={() => {}}
                                onJoinFairbundle={() => {}}
                                onCreateOrder={() => {}}/>
            </Modal>
        );
    }
}
