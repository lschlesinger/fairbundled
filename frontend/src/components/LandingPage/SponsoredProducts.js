import React from "react";
import { Col, Row } from "antd";
import PresentedProduct from "./PresentedProduct";
import ProductRecommendations from "./ProductRecommendations";

export default class SponsoredProducts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col span={16}>
                    <PresentedProduct
                        fairbundle={this.props.presentedFairbundle}
                    />
                </Col>
                <Col span={8}>
                    <ProductRecommendations />
                </Col>
            </Row>
        );
    }
}
