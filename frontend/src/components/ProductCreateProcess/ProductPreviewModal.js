import React from 'react';
import {Modal} from 'antd';
import "./ProductPreviewModal.less"


export default class ProductPreviewModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state= {
            visible: true
        }
    }

    render() {
        return (
            <div>
                <Modal
                    title="Vorschau"
                    visible={this.props.modalVisible}
                    onCancel={this.props.onClose}
                    footer={null}
                >
                    <p>{this.props.product.name}</p>
                    <p>{this.props.product.description}</p>
                    <p>{this.props.product.ean}</p>
                </Modal>
            </div>
        );
    }
}
