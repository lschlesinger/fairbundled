import React from 'react';
import {Col, Divider, Modal, Row} from 'antd';
import "./ProductPreviewModal.less"
import ProductImage from "../ProductImage/ProductImage";

function onChange(a, b, c) {
    console.log(a, b, c);
}

export default class ProductPreviewModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: true
        }

    }

    render() {
        return (

            <Modal
                className="product-create-process__preview"
                title="Vorschau"
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
            >
                <Row justify="center">
                    <Col span={8}>
                        <ProductImage images={this.props.product?.images}/>
                    </Col>
                    <Col span={16} className="padding-horizontal--sm">
                        <h3>{this.props.product.name}</h3>
                        <Divider className="margin-vertical--sm"/>
                        <p>{this.props.product.description}</p>
                        <p>{this.props.product.ean}</p>
                    </Col>
                </Row>
            </Modal>
        );
    }
}
