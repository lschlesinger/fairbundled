import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "./MySupplierData.less";

const { Text } = Typography;

export default class MySupplierData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: this.props.supplier,
        };
    }

    render() {
        return (
            <Card title="Gebührenübersicht" className="padding-horizontal--sm">
                {/* Gebühren des letzten Monats */}
                <Row className="padding-top--md">
                    <Text mark>Letzter Monat</Text>
                </Row>
                <Row className="padding-top--sm" gutter={8}>
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Fixer Anteil:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.props.supplier.monthlyFixedFee)}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--sm" gutter={8}>
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Variabler Anteil:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.props.supplier.monthlyVariableFee)}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--sm" gutter={8}>
                    <Col span={12}>
                        <Text
                            className="my-supplier-data__text"
                            underline
                            strong
                        >
                            Summe:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text underline className="my-supplier-data__text">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(
                                this.props.supplier.monthlyVariableFee +
                                    this.props.supplier.monthlyFixedFee
                            )}
                        </Text>
                    </Col>
                </Row>
                {/* Gebühren Insgesamt */}
                <Row className="padding-top--md">
                    <Text mark>Insgesamt</Text>
                </Row>
                <Row className="padding-top--sm" gutter={8}>
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Fixer Anteil:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.props.supplier.totalFixedFee)}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--sm" gutter={8}>
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Variabler Anteil:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(this.props.supplier.totalVariableFee)}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--sm" gutter={8}>
                    <Col span={12}>
                        <Text
                            className="my-supplier-data__text"
                            underline
                            strong
                        >
                            Summe:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text underline className="my-supplier-data__text">
                            {new Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(
                                this.props.supplier.totalVariableFee +
                                    this.props.supplier.totalFixedFee
                            )}
                        </Text>
                    </Col>
                </Row>
            </Card>
        );
    }
}
