import React from "react";
import {Button, Card, Cascader, Col, Row, Space, Switch, Tag, Typography,} from "antd";
import {Link} from "react-router-dom";
import "./ProductListCard.less";
import placeholder from "../../assets/placeholder.png";

const {Paragraph, Text, Title} = Typography;
const options = [
    {value: "Niedrigster Preis", label: "Niedrigster Preis"},
    {
        value: "Höchster Preis",
        label: "Höchster Preis",
    },
];

export default class ProductListCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: false,
            ordering: "Bitte auswählen",
        };
        this.handleOrdering = this.handleOrdering.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //function to determine the lowest price and to differentiate between one and multiple price level (Difference: Ab)
    getLowestPrice(product) {
        if (product.priceLevel.length < 2) {
            return (
                <Title level={4} className="price">
                    {product.smallestPrice} €
                </Title>
            );
        } else {
            // let lowestPrice = Number.MAX_VALUE;
            // for (var i = 0; i < product.priceLevel.length; i++) {
            //     lowestPrice = Math.min(
            //         lowestPrice,
            //         product.priceLevel[i].unitPrice
            //     );
            // }
            return (
                <Title level={4} className="price">
                    Ab {product.smallestPrice}
                    {/* Ab {lowestPrice} € */}
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
                                    src={product.images?.length > 0 ? product.images[0] : placeholder}
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
        this.setState({checked});
    }

    handleOrdering(ordering) {
        this.setState({ordering});
    }

    hasFairbundle(p) {
        return p.filter((product) => product.hasFairbundle == true);
    }

    sortProducts() {
        if (this.state.ordering == "Niedrigster Preis") {
            return this.props.products.sort(
                (a, b) => a.smallestPrice - b.smallestPrice
            );
        }
        if (this.state.ordering == "Höchster Preis") {
            return this.props.products.sort(
                (a, b) => b.smallestPrice - a.smallestPrice
            );
        }
        return this.props.products;
    }

    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Row align="middle" className="upperRow">
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
                        <Row
                            justify="center"
                            align="middle"
                            className="upperRow"
                        >
                            <Text strong>
                                {this.props.products.length === 1
                                    ? this.props.products.length + " Ergebnis"
                                    : this.props.products.length +
                                    " Ergebnisse"}
                            </Text>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row justify="end" className="upperRow">
                            <Cascader
                                options={options}
                                onChange={this.handleOrdering}
                                ordering={this.state.ordering}
                                placeholder={this.state.ordering}
                            ></Cascader>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} className="product-list-card__cards">
                    {this.state.checked
                        ? this.hasFairbundle(this.sortProducts()).map((p) =>
                            this.getCardItem(p)
                        )
                        : this.sortProducts().map((p) => this.getCardItem(p))}
                </Row>
            </div>
        );
    }
}
