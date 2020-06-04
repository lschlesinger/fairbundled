import React from "react";
import { Button, Card, Col, Row, Typography, Tag } from "antd";
import example_image from "../feuerwehr-einsatzjacke.jpg";
import { Link } from "react-router-dom";

const { Paragraph, Text, Title } = Typography;
const { Meta } = Card;

export default class ProductListCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    //function to determine the lowest price and to differentiate between one and multiple price level (Difference: Ab)
    getLowestPrice(product) {
        if (product.priceLevel.length < 2) {
            return (
                <Paragraph ellipsis>
                    <Text strong>{product.priceLevel[0].unitPrice} €</Text>
                </Paragraph>
            );
        } else {
            let lowestPrice = Number.MAX_VALUE;
            for (var i = 0; i < product.priceLevel.length; i++) {
                lowestPrice = Math.min(
                    lowestPrice,
                    product.priceLevel[i].unitPrice
                );
            }
            return (
                <Paragraph ellipsis>
                    <Title level={4}>Ab {lowestPrice} €</Title>
                </Paragraph>
            );
        }
    }

    getCardItem(product) {
        const price = this.getLowestPrice(product);
        return (
            <Col span={8}>
                {/* <Card
                    hoverable
                    cover={<img src={example_image} alt={product.name} />}
                >
                    <Meta title={product.name} key={product._id} />
                    <Row>
                        <Col></Col>
                    </Row>
                </Card> */}
                <Card>
                    {/* title={product.name} key={product._id} bordered={true} */}
                    <Row>
                        <Col span={18}>
                            <Paragraph>
                                <Title level={4}>{product.name}</Title>
                            </Paragraph>
                        </Col>
                        <Col span={6}>
                            {product.hasFairbundle ? (
                                <Tag color="#78A262">Fairbundle</Tag>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={10}>
                            <img src={example_image} alt="bild" width="100%" />
                        </Col>
                        <Col span={14}>
                            <Row justify="center">
                                <Paragraph>
                                    <Text strong>{product.description}</Text>
                                </Paragraph>
                            </Row>
                            <Row justify="center">{price}</Row>
                            <Row justify="center">
                                {" "}
                                <Link to={`/product/${product._id}`}>
                                    <Button
                                        shape="round"
                                        size="middle"
                                        type="primary"
                                    >
                                        Details
                                    </Button>
                                </Link>
                            </Row>
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
