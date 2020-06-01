import React from "react";
import {Card, Col, Row} from "antd";

export default class CategoryHeaderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getCardItem(product) {
        return (
            <Col span={8}>
                <Card title={product.name}
                      bordered={true}
                      hoverable>
                    {product.description}
                </Card>
            </Col>
        );
    }

    render() {
        return (
            <Row gutter={16} className="product-list-card__cards">
                {this.props.products.map((p) => this.getCardItem(p))}
            </Row>
        )
    }
}

