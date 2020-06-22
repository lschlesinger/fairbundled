import React from "react";
import { Button, Card, Col, Divider, Typography, Row, Space } from "antd";
import "./OrderOverview.less";
import { NotificationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import placeholder from "../../assets/placeholder.png";

const { Text, Title } = Typography;

export default class MySupplierData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: null,
        };
    }

    render() {
        return (
            <Card title="Verkaufsübersicht" className="padding-horizontal--sm">
                {/* Aktive, Verkaufte Produkte und Gesamtumsatz */}
                <Row className="margin--sm order-overview__kpis" gutter={8}>
                    <Col span={9}>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {this.props.supplier.activeProducts}
                            </Text>
                        </Row>
                        <Row
                            justify="center"
                            className="padding-top--xs padding-bottom--sm"
                        >
                            <Text strong>Aktiv</Text>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {this.props.supplier.qtySold}
                            </Text>
                        </Row>
                        <Row
                            justify="center"
                            className="padding-top--xs padding-bottom--sm"
                        >
                            <Text strong>Verkauft</Text>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {new Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                }).format(this.props.supplier.revenue)}
                            </Text>
                        </Row>
                        <Row
                            justify="center"
                            className="padding-top--xs padding-bottom--sm"
                        >
                            <Text strong>Gesamtumsatz</Text>
                        </Row>
                    </Col>
                </Row>
                {/* Jetzt Verkaufen Button */}
                <Row justify="center" className="margin--lg">
                    <Link to="/product/create">
                        <Button type="primary" icon={<NotificationOutlined />}>
                            Jetzt Verkaufen
                        </Button>
                    </Link>
                </Row>
                <Divider />
                {/* Bestseller nach Anzahl der Verkäufe */}
                <Row>
                    <Row className="margin-bottom--sm">
                        <Title className="padding-right--sm" level={4}>
                            Bestseller
                        </Title>
                        <Text>(gemessen in: Anzahl der Verkäufe)</Text>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <img
                                src={
                                    this.props.supplier.bestseller.qtyBestseller
                                        .product.images?.length > 0
                                        ? this.props.supplier.bestseller
                                              .qtyBestseller.product.images[0]
                                        : placeholder
                                }
                                alt="bild"
                                width="100%"
                            ></img>
                        </Col>
                        <Col span={18}>
                            <Row
                                justify="center"
                                align="middle"
                                className="margin-bottom--md"
                            >
                                <Text strong>
                                    {
                                        this.props.supplier.bestseller
                                            .qtyBestseller.product.name
                                    }
                                </Text>
                            </Row>
                            <Row>
                                <Col justify="center" span={12}>
                                    <Row justify="center">
                                        <Text
                                            className="order-overview__bestsellerNum"
                                            strong
                                        >
                                            {
                                                this.props.supplier.bestseller
                                                    .qtyBestseller.qty
                                            }
                                        </Text>
                                    </Row>
                                    <Row
                                        className="margin-bottom--sm"
                                        justify="center"
                                    >
                                        <Text strong>Verkauft</Text>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row justify="center">
                                        <Text
                                            className="order-overview__bestsellerNum"
                                            strong
                                        >
                                            {new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR",
                                            }).format(
                                                this.props.supplier.bestseller
                                                    .qtyBestseller.revenue
                                            )}
                                        </Text>
                                    </Row>
                                    <Row
                                        className="margin-bottom--sm"
                                        justify="center"
                                    >
                                        <Text strong>Umsatz</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
                <Divider />
                {/* Bestseller nach Umsatz*/}
                <Row className="margin-bottom--md">
                    <Row className="margin-bottom--sm">
                        <Title className="padding-right--sm" level={4}>
                            Bestseller
                        </Title>
                        <Text>(gemessen in: Umsatz)</Text>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <img
                                src={
                                    this.props.supplier.bestseller
                                        .revenueBestseller.product.images
                                        ?.length > 0
                                        ? this.props.supplier.bestseller
                                              .revenueBestseller.product
                                              .images[0]
                                        : placeholder
                                }
                                alt="bild"
                                width="100%"
                            ></img>
                        </Col>
                        <Col span={18}>
                            <Row
                                justify="center"
                                align="middle"
                                className="margin-bottom--md"
                            >
                                <Text strong>
                                    {
                                        this.props.supplier.bestseller
                                            .revenueBestseller.product.name
                                    }
                                </Text>
                            </Row>
                            <Row>
                                <Col justify="center" span={12}>
                                    <Row justify="center">
                                        <Text
                                            className="order-overview__bestsellerNum"
                                            strong
                                        >
                                            {
                                                this.props.supplier.bestseller
                                                    .revenueBestseller.qty
                                            }
                                        </Text>
                                    </Row>
                                    <Row
                                        className="margin-bottom--sm"
                                        justify="center"
                                    >
                                        <Text strong>Verkauft</Text>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Row justify="center">
                                        <Text
                                            className="order-overview__bestsellerNum"
                                            strong
                                        >
                                            {new Intl.NumberFormat("de-DE", {
                                                style: "currency",
                                                currency: "EUR",
                                            }).format(
                                                this.props.supplier.bestseller
                                                    .revenueBestseller.revenue
                                            )}
                                        </Text>
                                    </Row>
                                    <Row
                                        className="margin-bottom--sm"
                                        justify="center"
                                    >
                                        <Text strong>Umsatz</Text>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Card>
        );
    }
}
