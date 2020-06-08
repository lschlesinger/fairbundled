import React from 'react';
import {Col, Divider, Modal, Row} from 'antd';
import "./ProductPreviewModal.less"
import ProductImage from "../ProductDetails/ProductImage";
import ProductInformationText from "../ProductDetails/ProductInformationText";
import CertificateInformation from "../ProductDetails/CertificateInformation";
import OrderOptions from "../ProductDetails/OrderOptions";
import '../../App.less';

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
                title="Vorschau"
                visible={this.props.modalVisible}
                onCancel={this.props.onClose}
                footer={null}
            >
                <Row>
                    <Col span={18}>
                        <Row className="padding--md">
                            <Col span={7}>
                                <ProductImage product={this.props.product}/>
                            </Col>
                            <Col span={17}>
                                <ProductInformationText product={this.props.product}/>
                            </Col>
                        </Row>
                        <Row className="padding--md">
                            <CertificateInformation product={this.props.product}/>
                        </Row>
                    </Col>
                    <Col span={6} className="padding--md">
                        Order Options
                    </Col>
                </Row>
            </Modal>
        );
    }
}
