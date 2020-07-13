import React from "react";
import { Card, Layout, Row } from "antd";
import "./ProductRecommendations.less";

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout style={{height:"100%"}}>
                <Row className="presented-product-row" style={{height:"50%"}}>
                    <Card style={{width:"100%"}}>
                        Product Recommendation Carousel
                    </Card>
                </Row>
                <Row style={{height:"50%"}}>
                    <Card style={{width:"100%"}}>
                        Product Recommendation Carousel
                    </Card>
                </Row>
            </Layout>
        );
    }
}
