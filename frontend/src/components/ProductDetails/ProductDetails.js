import React from "react";
import {Col, Row} from "antd";
import ProductImage from "./ProductImage";
import CertificateInformation from "./CertificateInformation";
import OrderOptions from "./OrderOptions";
import ProductInformationText from "./ProductInformationText";


/**
 * props: {
 *     product
 *     fairbundles
 *     onCreateFairbundle
 *     onJoinFairbundle
 *     onCreateOrder
 * }
 */
export default class ProductDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

    render() {
        return (
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
                    <OrderOptions {...this.props}/>
                </Col>
            </Row>
        )
    }
}
