import React from 'react';
import {Modal} from 'antd';
import CreateFairbundle from '../../components/ProductDetails/CreateFairbundle';

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
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
                centered
                width="50%"
                title={"Neues Fairbundle"}
            >
                <CreateFairbundle
                        quantity={this.props.quantity}
                        product={this.props.product}
                        createFairbundle={this.props.createFairbundle} />
            </Modal>
        );
    }
}
