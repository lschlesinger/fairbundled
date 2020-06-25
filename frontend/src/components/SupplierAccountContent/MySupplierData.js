import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "./MySupplierData.less";

const { Text } = Typography;

export default class MySupplierData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: this.props.supplier,
            user: this.props.user,
        };
    }

    render() {
        return (
            <Card title="Persönliche Daten" className="padding-horizontal--sm">
                <Row className="padding-top--md" gutter={8}>
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            E-Mail Adresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.user.email}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--md">
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Rechnungsadresse:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.supplier.billingAddress}
                        </Text>
                    </Col>
                </Row>
                <Row className="padding-top--md padding-bottom--sm">
                    <Col span={12}>
                        <Text className="my-supplier-data__text" strong>
                            Bankverbindung:
                        </Text>
                    </Col>
                    <Col span={12}>
                        <Text className="my-supplier-data__text">
                            {this.state.supplier.bankAccount}
                        </Text>
                    </Col>
                </Row>
            </Card>
        );
    }
}
