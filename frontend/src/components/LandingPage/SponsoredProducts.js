import React from "react";
import { Col, Row, Divider } from "antd";
import PresentedProduct from "./PresentedProduct";
import ProductRecommendations from "./ProductRecommendations";

export default class SponsoredProducts extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row gutter={[24, 0]} justify="center" className="padding--md">
                <Col span={16}>
                    <PresentedProduct
                        presentedFairbundle={this.props.presentedFairbundle}
                    />
                </Col>
                <Col style={{marginRight:15, width:1}}>
                    <Divider type="vertical" style={{ height: "100%" }} />
                </Col>
                <Col span={7}>
                    <ProductRecommendations sponsoredProducts={this.props.sponsoredProducts}/>
                </Col>
            </Row>
        );
    }
}
