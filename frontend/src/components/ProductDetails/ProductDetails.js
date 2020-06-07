import React from "react";
import {Col, Row} from "antd";
import ProductImage from "./ProductImage";
import CertificateInformation from "./CertificateInformation";
import OrderOptions from "./OrderOptions";
import ProductInformationText from "./ProductInformationText";


export default class ProductDetails extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <ProductImage/>
                        </Col>
                        <Col>
                            <ProductInformationText/>
                        </Col>
                    </Row>
                    <Row>
                        <CertificateInformation/>
                    </Row>
                </Col>
                <Col>
                    <OrderOptions/>
                </Col>
            </Row>
        )
    }
}
