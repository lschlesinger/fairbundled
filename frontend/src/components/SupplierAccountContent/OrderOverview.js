import React from "react";
import { Button, Card, Col, Divider, Typography, Row } from "antd";
import "./OrderOverview.less";
import { NotificationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

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
                <Row className="margin--sm order-overview__kpis" gutter={8}>
                    <Col span={7}>
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
                    <Col span={7}>
                        <Row className="padding-top--sm" justify="center">
                            <Text className="order-overview__number" strong>
                                {this.props.supplier.productsSold}
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
                <Row justify="center" className="margin--lg">
                    <Link to="/product/create">
                        <Button type="primary" icon={<NotificationOutlined />}>
                            Jetzt Verkaufen
                        </Button>
                    </Link>
                </Row>
                <Divider />
            </Card>
        );
    }
}
