import React, { useState } from "react";
import { Button, Card, Col, Space, Row, Typography, Tag, Switch } from "antd";
import example_image from "../../feuerwehr-einsatzjacke.jpg";
import { Link } from "react-router-dom";
import "./ProductListCard.less";

const { Paragraph, Text, Title } = Typography;

function onChange(checked) {
    console.log(`switch to ${checked}`);
}

export default class ProductListCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    //function to determine the lowest price and to differentiate between one and multiple price level (Difference: Ab)
    getLowestPrice(product) {
        if (product.priceLevel.length < 2) {
            return (
                <Title level={4} className="price">
                    {product.priceLevel[0].unitPrice} €
                </Title>
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
                <Title level={4} className="price">
                    Ab {lowestPrice} €
                </Title>
            );
        }
    }

    getCardItem(product) {
        const price = this.getLowestPrice(product);
        return (
            <Col span={8}>
                <Card>
                    {/* title={product.name} key={product._id} bordered={true} */}
                    <Row gutter={8}>
                        <Col span={10}>
                            <Row id="product_image" align="middle">
                                <img
                                    src={example_image}
                                    alt="bild"
                                    width="100%"
                                />
                            </Row>
                        </Col>
                        <Col id="content_col" span={14}>
                            <Row id="fairbundle_tag" justify="start">
                                <Paragraph>
                                    {product.hasFairbundle ? (
                                        <Tag color="#78A262">Fairbundle</Tag>
                                    ) : (
                                        ""
                                    )}
                                </Paragraph>
                            </Row>
                            <Row id="product_title" justify="start">
                                <Title level={4}>{product.name}</Title>
                            </Row>
                            <Row id="product_description" justify="start">
                                <Paragraph>
                                    <Text>{product.description}</Text>
                                </Paragraph>
                            </Row>
                            <Row gutter={8} align="middle">
                                <Col span={12}>{price}</Col>
                                <Col span={12}>
                                    <Link to={`/product/${product._id}`}>
                                        <Button
                                            shape="round"
                                            size="middle"
                                            type="primary"
                                        >
                                            Details
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        );
    }
    handleChange(checked) {
        this.setState({ checked });
    }

    hasFairbundle() {
        return this.props.products.filter(
            (product) => product.hasFairbundle == true
        );
    }

    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Row>
                            <Space align="start" size="middle">
                                <Text strong>Fairbundle</Text>
                                <Switch
                                    onChange={this.handleChange}
                                    checked={this.state.checked}
                                />
                            </Space>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row justify="center">
                            <Text strong>
                                {this.props.products.length} Ergebnisse
                            </Text>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row justify="end"> </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="product-list-card__cards">
                    {this.state.checked
                        ? this.hasFairbundle().map((p) => this.getCardItem(p))
                        : this.props.products.map((p) => this.getCardItem(p))}
                </Row>
            </div>
        );
    }
}
