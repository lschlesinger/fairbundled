import React from "react";
import {Card, Col, Row, Typography} from "antd";
import logo from '../logo.png';

const {Paragraph} = Typography;


export default class CategoryHeaderMenu extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    getCardItem(product) {
        return (
            <Col span={8}>
                <Card title={product.name}
                      bordered={true}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <img src={logo} alt="bild" width="100%"/>
                        </Col>
                        <Col span={18}>
                            <Paragraph ellipsis>
                                {product.description}
                            </Paragraph>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }

    render() {
        return (
            <Row gutter={[16, 16]}
                 className="product-list-card__cards">
                {this.props.products.map((p) => this.getCardItem(p))}
            </Row>
        )
    }
}

