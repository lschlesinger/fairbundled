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
                <Col>
                    <Row>
                        <Col>
                            <ProductImage product={this.props.product}/>
                        </Col>
                        <Col>
                            <ProductInformationText product={this.props.product}/>
                        </Col>
                    </Row>
                    <Row>
                        <CertificateInformation product={this.props.product}/>
                    </Row>
                </Col>
                <Col>
                    <OrderOptions {...this.props}/>
                </Col>
            </Row>
        )
    }
}
