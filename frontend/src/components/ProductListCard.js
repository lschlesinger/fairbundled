import React from "react";
import { Button, Card, Col, Row, Typography, Tag } from "antd";
import example_image from "../feuerwehr-einsatzjacke.jpg";
import { Link } from "react-router-dom";

const { Paragraph } = Typography;

export default class ProductListCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    getCardItem(product) {
        return (
            <Col span={8}>
                <Card title={product.name} key={product._id} bordered={true}>
                    <Row gutter={16} justify="center">
                        <Col span={10} align="left">
                            <img src={example_image} alt="bild" width="100%" />
                        </Col>
                        <Col span={14}>
                            {product.hasFairbundle ? (
                                <Paragraph ellipsis text-align="right">
                                    <Tag color="#78A262">Fairbundle</Tag>
                                </Paragraph>
                            ) : (
                                ""
                            )}
                            <Paragraph ellipsis text-align="center">
                                {product.description}
                            </Paragraph>
                            <Link to={`/product/${product._id}`}>
                                <Button
                                    shape="round"
                                    size="middle"
                                    type="primary"
                                    ali
                                >
                                    Details
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }

    render() {
        return (
            <Row gutter={[16, 16]} className="product-list-card__cards">
                {this.props.products.map((p) => this.getCardItem(p))}
            </Row>
        );
    }
}
