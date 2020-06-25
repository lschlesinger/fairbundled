import React from 'react';
import {Modal} from 'antd';
import ProductDetails from "../../components/ProductDetails/ProductDetails";

export default class FairbundleCreatedModalView extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true
        }

    }

    render() {
        return (
            <Modal
                title="Fairbundle erstellen"
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
                width="60%"
            >
                {/* <ProductDetails entityName={this.props.entityName}
                                product={this.props.product}
                                fairbundles={this.props.fairbundles}
                                onCreateFairbundle={() => {}}
                                onJoinFairbundle={() => {}}
                                onCreateOrder={() => {}}/> */}
            </Modal>
        );
    }
}