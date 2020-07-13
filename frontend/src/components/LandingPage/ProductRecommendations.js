import React from "react";
import { Card, Layout, Row, Carousel } from "antd";
import "./ProductRecommendations.less";

export default class PresentedProduct extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Carousel>
                <div>
                    <Row className="presented-product-row" style={{height:"50%"}}>
                        <Card style={{width:"99%"}}>
                            Product Recommendation Carousel
                        </Card>
                    </Row>
                    <Row style={{height:"50%"}}>
                        <Card style={{width:"99%"}}>
                            Product Recommendation Carousel
                        </Card>
                    </Row>
                </div>
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                {/* <div>
                    <Row className="presented-product-row" style={{height:"50%"}}>
                        <Card>
                            Product Recommendation Carousel
                        </Card>
                    </Row>
                    <Row style={{height:"50%"}}>
                        <Card>
                            Product Recommendation Carousel
                        </Card>
                    </Row>
                </div>
                <div>
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
                </div> */}
            </Carousel>
                // {/* <Row className="presented-product-row" style={{height:"50%"}}>
                //     <Card style={{width:"100%"}}>
                //         Product Recommendation Carousel
                //     </Card>
                // </Row>
                // <Row style={{height:"50%"}}>
                //     <Card style={{width:"100%"}}>
                //         Product Recommendation Carousel
                //     </Card>
                // </Row> */}
        );
    }
}
