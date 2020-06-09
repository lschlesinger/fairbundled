import React from "react";
import {
    Button,
    Card,
    Cascader,
    Col,
    Row,
    Space,
    Switch,
    Tag,
    Typography,
} from "antd";
import { Link } from "react-router-dom";
import "./ProductListCard.less";
import placeholder from "../../assets/placeholder.png";

const { Paragraph, Text, Title } = Typography;
const options = [
    { value: "Niedrigster Preis", label: "Niedrigster Preis" },
    { value: "Höchster Preis", label: "Höchster Preis" }
];

export default class ProductListCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: false,
            ordering: "Bitte auswählen",
            products: this.props.products,
        };
        this.handleOrdering = this.handleOrdering.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //function to determine the lowest price and to differentiate between one and multiple price levels (Difference: Ab)
    getLowestPrice(product) {
        return (
            <Title level={4} className="price">
                {product.priceLevel.length < 2 ? "" : "Ab "}
                {product.smallestPrice} €
            </Title>
        );
    }

    //function to create every single card based on every single product
    getCardItem(product) {
        const price = this.getLowestPrice(product);
        return (
            <Col span={8} key={product._id}>
                <Card>
                    {/* title={product.name} key={product._id} bordered={true} */}
                    <Row gutter={12}>
                        <Col span={10}>
                            <Row
                                className="product-list-card__product-image"
                                align="middle"
                            >
                                <img
                                    src={
                                        product.images?.length > 0
                                            ? product.images[0]
                                            : placeholder
                                    }
                                    alt="bild"
                                    width="100%"
                                />
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row
                                className="product-list-card__fairbundle_tag"
                                justify="start"
                            >
                                <Paragraph>
                                    {product.hasFairbundle ? (
                                        <Tag color="#78A262">Fairbundle</Tag>
                                    ) : (
                                        ""
                                    )}
                                </Paragraph>
                            </Row>
                            <Row
                                className="product-list-card__product_title"
                                justify="start"
                            >
                                <Title level={4}>{product.name}</Title>
                            </Row>
                            <Row
                                className="product-list-card__product_description"
                                justify="start"
                            >
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
                                            block
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
    //handles the changes of the Fairbundle switch (top left)
    handleChange(checked) {
        this.setState({ checked });
        this.setState({
            products: checked
                ? this.state.products.filter(
                      (product) => product.hasFairbundle === true
                  )
                : this.props.products,
        });
    }
    //handles the ordering of the elements based on price ascending and descending (top right)
    handleOrdering(ordering) {
        this.setState({ ordering: ordering });
        if (ordering[0] === "Niedrigster Preis") {
            this.setState({
                products: this.state.products.sort(
                    (a, b) => a.smallestPrice - b.smallestPrice
                ),
            });
            console.log(this.state.products);
        }
        if (ordering[0] === "Höchster Preis") {
            this.setState({
                products: this.state.products.sort(
                    (a, b) => b.smallestPrice - a.smallestPrice
                ),
            });
        }
    }

    render() {
        return (
            <div>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Row
                            align="middle"
                            className="product-list-card__upperRow"
                        >
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
                            className="product-list-card__upperRow"
                        >
                            <Text strong>
                                {this.state.products.length === 1
                                    ? this.state.products.length + " Ergebnis"
                                    : this.state.products.length +
                                      " Ergebnisse"}
                            </Text>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            justify="end"
                            className="product-list-card__upperRow"
                        >
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
                    {this.state.products.map((p) => this.getCardItem(p))}
                </Row>
            </div>
        );
    }
}
